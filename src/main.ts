import { Client, GatewayIntentBits, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, Events } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import 'dotenv/config';
import { generateMatchColorsComponents } from './modules/generateMatchColorsComponents';
import { generateChargeEnergy } from './modules/generateChargeEnergy';

const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN: string = process.env.DISCORD_TOKEN!;
const CLIENT_ID: string = process.env.CLIENT_ID!;
const GUILD_ID: string = process.env.GUILD_ID!;
const terminalRoute: Record<string, number>[]= [
    {"t00":1}, {"t01":2}, {"t02":3}, {"t03":4}, {"t04":5},
    {"t10":5}, {"t11":1}, {"t12":2}, {"t13":3}, {"t14":4},
    {"t20":4}, {"t21":5}, {"t22":1}, {"t23":2}, {"t24":3},
    {"t30":3}, {"t31":4}, {"t32":5}, {"t33":1}, {"t34":2},
    {"t40":2}, {"t41":3}, {"t42":4}, {"t43":5}, {"t44":1},
];
const panelMatchColors: Record<string, number>[]= [
    {"m00":1}, {"m01":2}, {"m02":3}, 
    {"m10":3}, {"m11":1}, {"m12":2}, 
    {"m20":2}, {"m21":3}, {"m22":1}
];
const panelChargeEnergy: Record<string, number>[]= [
    {"t00":-1}, {"t01":-1}, {"t02":-1}, {"t03":-1}, {"t04":-1},
    {"t10":-1}, {"t11":1}, {"t12":2}, {"t13":3}, {"t14":-1},
    {"t20":-1}, {"t21":2}, {"t22":-1}, {"t23":1}, {"t24":-1},
    {"t30":3}, {"t31":1}, {"t32":-1}, {"t33":2}, {"t34":1},
    {"t40":-2}, {"t41":-1}, {"t42":-1}, {"t43":-1}, {"t44":-3},
];

const commands = [
    new SlashCommandBuilder()
        .setName('match-colors')
        .setDescription('色を揃えろ！'),
    new SlashCommandBuilder()
        .setName('charge-energy')
        .setDescription('バッテリーから電気を供給するんだ！')
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
    if(interaction.commandName === "match-colors"){
        const components: ActionRowBuilder<ButtonBuilder>[] = generateMatchColorsComponents(panelMatchColors);
        await interaction.reply({ content: '色を揃えろ！', components: components});
    }
    if(interaction.commandName === "charge-energy"){
        const components: ActionRowBuilder<ButtonBuilder>[] = generateChargeEnergy(panelChargeEnergy);
        await interaction.reply({ content: 'バッテリーから電気を供給するんだ！', components: components});
    }
});

// ボタンクリック時の処理
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    await interaction.deferUpdate(); 
    for(let i = 0; i < panelMatchColors.length; i++){
        if(Object.keys(panelMatchColors[i])[0] === interaction.customId){
            panelMatchColors[i][interaction.customId]--;
        const components: ActionRowBuilder<ButtonBuilder>[] = generateMatchColorsComponents(panelMatchColors);
        await interaction.editReply({ content: '色を揃えろ！', components: components});
        }
    }
    for(let i = 0; i < panelChargeEnergy.length; i++){
        if(Object.keys(panelChargeEnergy[i])[0] === interaction.customId){
            panelChargeEnergy[i][interaction.customId]--;
        const components: ActionRowBuilder<ButtonBuilder>[] = generateChargeEnergy(panelChargeEnergy);
        await interaction.editReply({ content: 'バッテリーから電気を供給するんだ！', components: components});
        }
    }
});

// Bot のログイン
client.login(TOKEN);
