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
        const buttons = (0, generateButton_1.generateButton)(["1", "2", "3", "4"]);
        const button1 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button1')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button2 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button2')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button3 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button3')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button4 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button4')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button5 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button5')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button6 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button6')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button7 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button7')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button8 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button8')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button9 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button9')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button10 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button10')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button11 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button11')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const button12 = new discord_js_1.ButtonBuilder()
            .setCustomId('test_button12')
            .setLabel('クリック！')
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const row1 = new discord_js_1.ActionRowBuilder().addComponents(button1, button2, button3, button4);
        const row2 = new discord_js_1.ActionRowBuilder().addComponents(button5, button6, button7, button8);
        const row3 = new discord_js_1.ActionRowBuilder().addComponents(button9, button10, button11, button12);
        const row4 = new discord_js_1.ActionRowBuilder().addComponents(buttons[0], buttons[1], buttons[2], buttons[3]);
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
