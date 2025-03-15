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
const generateButton_1 = require("./modules/generateButton");
const generateDevice_1 = require("./modules/generateDevice");
const generateComponents_1 = require("./modules/generateComponents");
const generateMatchColorsComponents_1 = require("./modules/generateMatchColorsComponents");
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
let customIds = [];
let deviceCustomIds = [];
let deviceButtons = [];
const terminalRoute = [
    { "t00": 1 }, { "t01": 2 }, { "t02": 3 }, { "t03": 4 }, { "t04": 5 },
    { "t10": 5 }, { "t11": 1 }, { "t12": 2 }, { "t13": 3 }, { "t14": 4 },
    { "t20": 4 }, { "t21": 5 }, { "t22": 1 }, { "t23": 2 }, { "t24": 3 },
    { "t30": 3 }, { "t31": 4 }, { "t32": 5 }, { "t33": 1 }, { "t34": 2 },
    { "t40": 2 }, { "t41": 3 }, { "t42": 4 }, { "t43": 5 }, { "t44": 1 },
];
const panelMatchColors = [
    { "m00": 1 }, { "m01": 2 }, { "m02": 3 },
    { "m10": 3 }, { "m11": 1 }, { "m12": 2 },
    { "m20": 2 }, { "m21": 3 }, { "m22": 1 }
];
let buttonMap;
// スラッシュコマンドの登録
const commands = [
    new discord_js_1.SlashCommandBuilder()
        .setName('button')
        .setDescription('ボタンを表示します。'),
    new discord_js_1.SlashCommandBuilder()
        .setName('device')
        .setDescription('デバイス起動'),
    new discord_js_1.SlashCommandBuilder()
        .setName('terminal')
        .setDescription('デバイス起動'),
    new discord_js_1.SlashCommandBuilder()
        .setName('match-colors')
        .setDescription('色を揃えろ！')
].map(command => command.toJSON());
const rest = new rest_1.REST({ version: '10' }).setToken(TOKEN);
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
    if (interaction.commandName === 'button') {
        // ボタンの作成
        const [buttons1, customIds1] = (0, generateButton_1.generateButton)(["1", "2", "3", "4"]);
        const [buttons2, customIds2] = (0, generateButton_1.generateButton)(["5", "6", "7", "8"]);
        const [buttons3, customIds3] = (0, generateButton_1.generateButton)(["9", "10", "11", "12"]);
        const [buttons4, customIds4] = (0, generateButton_1.generateButton)(["13", "14", "15", "16"]);
        const row1 = new discord_js_1.ActionRowBuilder().addComponents(buttons1);
        const row2 = new discord_js_1.ActionRowBuilder().addComponents(buttons2);
        const row3 = new discord_js_1.ActionRowBuilder().addComponents(buttons3);
        const row4 = new discord_js_1.ActionRowBuilder().addComponents(buttons4);
        yield interaction.reply({ content: 'ターミナル1', components: [row1, row2, row3, row4] });
        customIds = [...customIds1, ...customIds2, ...customIds3, ...customIds4];
    }
    if (interaction.commandName === "device") {
        const deviceRoute = [
            [-1, -1, -1, -1, -1],
            [-1, 1, 2, 3, -1],
            [-1, 1, -1, 1, -1],
            [1, 1, -1, 3, 1],
            [-2, -1, -1, -1, -3]
        ];
        const components = [];
        for (const route of deviceRoute) {
            const [buttons, customId] = (0, generateDevice_1.generateDevice)(route);
            const row = new discord_js_1.ActionRowBuilder().addComponents(buttons);
            components.push(row);
            deviceCustomIds.push(...customId);
            deviceButtons.push(...buttons);
        }
        yield interaction.reply({ content: 'ターミナル1', components: components });
        buttonMap = Object.fromEntries(deviceCustomIds.map((item, index) => [item, deviceRoute.flat()[index]]));
        console.log(buttonMap);
    }
    if (interaction.commandName === "terminal") {
        const components = (0, generateComponents_1.generateComponents)(terminalRoute);
        yield interaction.reply({ content: 'ターミナル1', components: components });
    }
    if (interaction.commandName === "match-colors") {
        const components = (0, generateMatchColorsComponents_1.generateMatchColorsComponents)(panelMatchColors);
        yield interaction.reply({ content: '色を揃えろ！', components: components });
    }
}));
// ボタンクリック時の処理
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isButton())
        return;
    /*
        if (interaction.customId in buttonMap) {
            await interaction.reply({ content: `${buttonMap[interaction.customId]}`, ephemeral: true });
        }
    */
    yield interaction.deferUpdate();
    for (let i = 0; i < terminalRoute.length; i++) {
        if (Object.keys(terminalRoute[i])[0] === interaction.customId) {
            terminalRoute[i][interaction.customId]--;
            const components = (0, generateComponents_1.generateComponents)(terminalRoute);
            yield interaction.editReply({ content: 'ターミナル1', components: components });
        }
    }
    for (let i = 0; i < panelMatchColors.length; i++) {
        if (Object.keys(panelMatchColors[i])[0] === interaction.customId) {
            panelMatchColors[i][interaction.customId]--;
            const components = (0, generateMatchColorsComponents_1.generateMatchColorsComponents)(panelMatchColors);
            yield interaction.editReply({ content: '色を揃えろ！', components: components });
        }
    }
}));
// Bot のログイン
client.login(TOKEN);
