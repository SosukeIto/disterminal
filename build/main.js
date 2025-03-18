"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const v10_1 = require("discord-api-types/v10");
require("dotenv/config");
const generateMatchColorsComponents_1 = require("./modules/generateMatchColorsComponents");
const generateChargeEnergy_1 = require("./modules/generateChargeEnergy");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const panelMatchColors = [
    { "m00": 1 }, { "m01": 2 }, { "m02": 3 },
    { "m10": 3 }, { "m11": 1 }, { "m12": 2 },
    { "m20": 2 }, { "m21": 3 }, { "m22": 1 }
];
const panelChargeEnergy = [
    { "t00": -1 }, { "t01": -1 }, { "t02": -1 }, { "t03": -1 }, { "t04": -1 },
    { "t10": -1 }, { "t11": 1 }, { "t12": 2 }, { "t13": 3 }, { "t14": -1 },
    { "t20": -1 }, { "t21": 2 }, { "t22": -1 }, { "t23": 1 }, { "t24": -1 },
    { "t30": 3 }, { "t31": 1 }, { "t32": -1 }, { "t33": 2 }, { "t34": 1 },
    { "t40": -2 }, { "t41": -1 }, { "t42": -1 }, { "t43": -1 }, { "t44": -3 },
];
const commands = [
    new discord_js_1.SlashCommandBuilder()
        .setName('match-colors')
        .setDescription('色を揃えろ！'),
    new discord_js_1.SlashCommandBuilder()
        .setName('charge-energy')
        .setDescription('バッテリーから電気を供給するんだ！')
].map(command => command.toJSON());
const rest = new rest_1.REST({ version: '10' }).setToken(TOKEN);
let isMatched = true;
let isCharged = true;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('スラッシュコマンドを登録中...');
        yield rest.put(v10_1.Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        console.log('スラッシュコマンドの登録完了！');
    }
    catch (error) {
        console.error(error);
    }
}))();
// コマンド実行時の処理
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName === "match-colors") {
        const components = (0, generateMatchColorsComponents_1.generateMatchColorsComponents)(panelMatchColors);
        isMatched = false;
        yield interaction.reply({ content: '色を揃えろ！', components: components });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            if (!isMatched) {
                yield interaction.followUp({ content: "時間切れ！失敗した..." });
            }
        }), 30000);
    }
    if (interaction.commandName === "charge-energy") {
        const components = (0, generateChargeEnergy_1.generateChargeEnergy)(panelChargeEnergy);
        yield interaction.reply({ content: 'バッテリーから電気を供給するんだ！', components: components });
        isCharged = false;
        yield interaction.reply({ content: '色を揃えろ！', components: components });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            if (!isCharged) {
                yield interaction.followUp({ content: "時間切れ！失敗した..." });
            }
        }), 30000);
    }
}));
// ボタンクリック時の処理
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isButton())
        return;
    yield interaction.deferUpdate();
    for (let i = 0; i < panelMatchColors.length; i++) {
        if (Object.keys(panelMatchColors[i])[0] === interaction.customId) {
            panelMatchColors[i][interaction.customId]--;
            const numbers = panelMatchColors.flatMap(obj => Object.values(obj)).every(value => value === 0);
            const components = (0, generateMatchColorsComponents_1.generateMatchColorsComponents)(panelMatchColors);
            if (numbers) {
                isMatched = true;
                yield interaction.editReply({ content: '全て揃えられました！', components: components });
                break;
            }
            yield interaction.editReply({ content: '色を揃えろ！', components: components });
        }
    }
    for (let i = 0; i < panelChargeEnergy.length; i++) {
        if (Object.keys(panelChargeEnergy[i])[0] === interaction.customId) {
            panelChargeEnergy[i][interaction.customId]--;
            const components = (0, generateChargeEnergy_1.generateChargeEnergy)(panelChargeEnergy);
            yield interaction.editReply({ content: 'バッテリーから電気を供給するんだ！', components: components });
        }
    }
}));
// Bot のログイン
client.login(TOKEN);
