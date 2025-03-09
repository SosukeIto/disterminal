import {ButtonBuilder, ButtonStyle,} from 'discord.js';


export function generateButton(rows: string[]){
    const buttons: ButtonBuilder[] = [];
    for(const row of rows){
        const button: ButtonBuilder = new ButtonBuilder()
        .setCustomId(Math.random().toString(36).slice(-16))
        .setLabel(row)
        .setStyle(ButtonStyle.Primary);
        buttons.push(button);
    }
    return buttons
}
