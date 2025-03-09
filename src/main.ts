import { Client, GatewayIntentBits, SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import 'dotenv/config';
import {generateButton} from './modules/generateButton';
// Discord Bot の設定
const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN: string = process.env.DISCORD_TOKEN!;
const CLIENT_ID: string = process.env.CLIENT_ID!;
const GUILD_ID: string = process.env.GUILD_ID!;

// スラッシュコマンドの登録
const commands = [
    new SlashCommandBuilder()
        .setName('button')
        .setDescription('ボタンを表示します。')
].map(command => command.toJSON());

const rest: REST = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('スラッシュコマンドを登録中...');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        console.log('スラッシュコマンドの登録完了！');
    } catch (error) {
        console.error(error);
    }
})();

// コマンド実行時の処理
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'button') {
        // ボタンの作成
        const buttons = generateButton(["1", "2", "3", "4"])
        const button1: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button1')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button2: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button2')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button3: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button3')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button4: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button4')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button5: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button5')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button6: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button6')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button7: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button7')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button8: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button8')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button9: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button9')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button10: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button10')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button11: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button11')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const button12: ButtonBuilder = new ButtonBuilder()
            .setCustomId('test_button12')
            .setLabel('クリック！')
            .setStyle(ButtonStyle.Primary);
        const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(button1, button2, button3, button4);
        const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(button5, button6, button7, button8);
        const row3 = new ActionRowBuilder<ButtonBuilder>().addComponents(button9, button10, button11, button12);
        const row4 = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons[0], buttons[1], buttons[2], buttons[3]);
        await interaction.reply({ content: 'ターミナル1', components: [row1, row2, row3, row4] });
    }
});

// ボタンクリック時の処理
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'test_button') {
        await interaction.reply({ content: `${interaction.user.username} さん、ボタンがクリックされました！`, ephemeral: true });
    }
});

// Bot のログイン
client.login(TOKEN);
