import { Client, GatewayIntentBits, SlashCommandBuilder, CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import 'dotenv/config';
import { generateButton } from './modules/generateButton';
import { generateDevice } from './modules/generateDevice';
// Discord Bot の設定
const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN: string = process.env.DISCORD_TOKEN!;
const CLIENT_ID: string = process.env.CLIENT_ID!;
const GUILD_ID: string = process.env.GUILD_ID!;
let customids: string[] = []
// スラッシュコマンドの登録
const commands = [
    new SlashCommandBuilder()
        .setName('button')
        .setDescription('ボタンを表示します。'),
    new SlashCommandBuilder()
        .setName('device')
        .setDescription('デバイス起動')
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
        const [ buttons1, customIds1 ] = generateButton(["1", "2", "3", "4"])
        const [ buttons2, customIds2 ] = generateButton(["5", "6", "7", "8"])
        const [ buttons3, customIds3 ] = generateButton(["9", "10", "11", "12"])
        const [ buttons4, customIds4 ] = generateButton(["13", "14", "15", "16"])
        const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons1);
        const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons2);
        const row3 = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons3);
        const row4 = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons4);
        await interaction.reply({ content: 'ターミナル1', components: [row1, row2, row3, row4] });
        customids = [...customIds1, ...customIds2, ...customIds3, ...customIds4]
    }
    if(interaction.commandName === "device"){
        const deviceRoute = [
            [-1, -1, -1, -1, -1],
            [-1, 1, 2, 3, -1],
            [-1, 1, -1, 1, -1],
            [1, 1, -1, 1, 1],
            [-2, -1, -1, -1, -3]
        ]
        const [ buttons1, customIds1 ] = generateDevice(deviceRoute[0]);
        const [ buttons2, customIds2 ] = generateDevice(deviceRoute[1]);
        const [ buttons3, customIds3 ] = generateDevice(deviceRoute[3]);
        const [ buttons4, customIds4 ] = generateDevice(deviceRoute[4]);
        const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons1);
        const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons2);
        const row3 = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons3);
        const row4 = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons4);
        await interaction.reply({ content: 'ターミナル1', components: [row1, row2, row3, row4] });
        customids = [...customIds1, ...customIds2, ...customIds3, ...customIds4]
    }
});

// ボタンクリック時の処理
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    if (customids.includes(interaction.customId)) {
        await interaction.reply({ content: `${interaction.user.username} さん、ボタンがクリックされました！`, ephemeral: true });
    }
});

// Bot のログイン
client.login(TOKEN);
