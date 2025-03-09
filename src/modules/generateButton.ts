import {ButtonBuilder, ButtonStyle,} from 'discord.js';

function genRandomId(){
    return Math.random().toString(36).slice(-16)
}
export function generateButton(rows: string[]): [ButtonBuilder[], string[]]{
    const buttons: ButtonBuilder[] = [];
    const customIds: string[] = []
    for(const row of rows){
        const customId: string = genRandomId()
        const button: ButtonBuilder = new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(row)
        .setStyle(ButtonStyle.Primary);
        customIds.push(customId)
        buttons.push(button);
    }
    return [buttons, customIds]
}
