import { Client, GatewayIntentBits, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, Events } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import 'dotenv/config';
import { generateMatchColorsComponents } from './modules/generateMatchColorsComponents';
import { generateChargeEnergy } from './modules/generateChargeEnergy';
import { generateTicTacToe } from './modules/generateTicTacToe';
import { generateRandomString } from './modules/generateRandomString';
const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN: string = process.env.DISCORD_TOKEN!;
const CLIENT_ID: string = process.env.CLIENT_ID!;
const GUILD_ID: string = process.env.GUILD_ID!;
const panelMatchColors: Record<string, number>[]= [
    {"m00":1}, {"m01":2}, {"m02":3}, 
    {"m10":3}, {"m11":1}, {"m12":2}, 
    {"m20":2}, {"m21":3}, {"m22":1}
];
const panelChargeEnergy: Record<string, number>[]= [
    {"ce00":-1}, {"ce01":-1}, {"ce02":-1}, {"ce03":-1}, {"ce04":-1},
    {"ce10":-1}, {"ce11":1}, {"ce12":2}, {"ce13":3}, {"ce14":-1},
    {"ce20":-1}, {"ce21":2}, {"ce22":-1}, {"ce23":1}, {"ce24":-1},
    {"ce30":3}, {"ce31":1}, {"ce32":-1}, {"ce33":2}, {"ce34":1},
    {"ce40":-2}, {"ce41":-1}, {"ce42":-1}, {"ce43":-1}, {"ce44":-3},
];
const panelTicTacToe: Record<string, number>[]= [
    {"ttt00":-1}, {"ttt01":-1}, {"ttt02":-1}, 
    {"ttt10":-1}, {"ttt11":-1}, {"ttt12":-1}, 
    {"ttt20":-1}, {"ttt21":-1}, {"ttt22":-1}
];
const commands = [
    new SlashCommandBuilder()
        .setName('match-colors')
        .setDescription('色を揃えろ！'),
    new SlashCommandBuilder()
        .setName('charge-energy')
        .setDescription('バッテリーから電気を供給するんだ！'),
    new SlashCommandBuilder()
        .setName('tic-tac-toe')
        .setDescription('⭕️❌ゲーム')
].map(command => command.toJSON());

const rest: REST = new REST({ version: '10' }).setToken(TOKEN);
let isMatched: boolean = true;
let isCharged: boolean = true;
let isRetired: boolean = true;
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
    if(interaction.commandName === "match-colors"){
        const components: ActionRowBuilder<ButtonBuilder>[] = generateMatchColorsComponents(panelMatchColors);
        isMatched = false;
        await interaction.reply({ content: '色を揃えろ！', components: components});
        setTimeout(async () => {
            if (!isMatched) {
                await interaction.followUp({ content: "時間切れ！失敗した..." });
            }
        }, 30000);
    }
    if(interaction.commandName === "charge-energy"){
        const components: ActionRowBuilder<ButtonBuilder>[] = generateChargeEnergy(panelChargeEnergy);
        isCharged = false;
        await interaction.reply({ content: 'バッテリーから電気を供給するんだ！', components: components});
        setTimeout(async () => {
            if (!isCharged) {
                await interaction.followUp({ content: "時間切れ！失敗した..." });
            }
        }, 30000);
    }
    if(interaction.commandName === "tic-tac-toe"){
        const components: ActionRowBuilder<ButtonBuilder>[] = generateTicTacToe(panelTicTacToe);
        isRetired = false;
        await interaction.reply({ content: 'プレイヤー：⭕️ 敵：❌', components: components});
        setTimeout(async () => {
            if (!isCharged) {
                await interaction.followUp({ content: "時間切れ！失敗した..." });
            }
        }, 30000);
    }
    
});

// ボタンクリック時の処理
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    await interaction.deferUpdate(); 
    for(let i = 0; i < panelMatchColors.length; i++){
        if(Object.keys(panelMatchColors[i])[0] === interaction.customId){
            panelMatchColors[i][interaction.customId]--;
            const numbers = panelMatchColors.flatMap(obj => Object.values(obj)).every(value => value === 0);
            const components: ActionRowBuilder<ButtonBuilder>[] = generateMatchColorsComponents(panelMatchColors);
            if (numbers){
                isMatched = true;
                await interaction.editReply({ content: '全て揃えられました！', components: components});
                break
            }
        await interaction.editReply({ content: '色を揃えろ！', components: components});
        }
    }
    for(let i = 0; i < panelChargeEnergy.length; i++){
        if(Object.keys(panelChargeEnergy[i])[0] === interaction.customId){
            panelChargeEnergy[i][interaction.customId]--;
        const components: ActionRowBuilder<ButtonBuilder>[] = generateChargeEnergy(panelChargeEnergy);
        const numbers = panelChargeEnergy.flatMap(obj => Object.values(obj)).every(value => value === 0 || value === -1 || value === -2 || value === -3);
        if (numbers){
            isCharged = true;
            await interaction.editReply({ content: '電力供給完了！', components: components});
            break;
        }
        await interaction.editReply({ content: 'バッテリーから電気を供給するんだ！', components: components});
        }
    }
    for(let i = 0; i < panelTicTacToe.length; i++){
        if(Object.keys(panelTicTacToe[i])[0] === interaction.customId){
            panelTicTacToe[i][interaction.customId] = 2;
            const components: ActionRowBuilder<ButtonBuilder>[] = generateTicTacToe(panelTicTacToe);
            const numbers = panelTicTacToe.flatMap(obj => Object.values(obj)).every(value => value === 0 || value === -1 || value === -2 || value === -3);
            if (numbers){
                isCharged = true;
                await interaction.editReply({ content: 'プレイヤー：⭕️ 敵：❌', components: components});
                break;
            }
            await interaction.editReply({ content: 'プレイヤー：⭕️ 敵：❌', components: components});
        }
    }
});

// Bot のログイン
client.login(TOKEN);
