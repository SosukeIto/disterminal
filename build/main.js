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
// Discord Bot の設定
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
// スラッシュコマンドの登録
const commands = [
    new discord_js_1.SlashCommandBuilder()
        .setName('button')
        .setDescription('ボタンを表示します。')
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
        const buttons1 = (0, generateButton_1.generateButton)(["1", "2", "3", "4"]);
        const buttons2 = (0, generateButton_1.generateButton)(["5", "6", "7", "8"]);
        const buttons3 = (0, generateButton_1.generateButton)(["9", "10", "11", "12"]);
        const buttons4 = (0, generateButton_1.generateButton)(["13", "14", "15", "16"]);
        const row1 = new discord_js_1.ActionRowBuilder().addComponents(buttons1);
        const row2 = new discord_js_1.ActionRowBuilder().addComponents(buttons2);
        const row3 = new discord_js_1.ActionRowBuilder().addComponents(buttons3);
        const row4 = new discord_js_1.ActionRowBuilder().addComponents(buttons4);
        yield interaction.reply({ content: 'ターミナル1', components: [row1, row2, row3, row4] });
    }
}));
// ボタンクリック時の処理
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isButton())
        return;
    if (interaction.customId === 'test_button') {
        yield interaction.reply({ content: `${interaction.user.username} さん、ボタンがクリックされました！`, ephemeral: true });
    }
}));
// Bot のログイン
client.login(TOKEN);
