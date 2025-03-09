import {ButtonBuilder, ButtonStyle,} from 'discord.js';

function genRandomId(){
    return Math.random().toString(36).slice(-16)
}
function setIcon(row: number): string{
    if(row === -1){
        return "_";
    }
    else if(row === -2){
        return "🔋";
    }
    else if(row === -3){
        return "🌑"
    }
    else{
        return `${row}`
    }
}
export function generateDevice(rows: number[]): [ButtonBuilder[], string[]]{
    const buttons: ButtonBuilder[] = [];
    const customIds: string[] = []
    for(const row of rows){
        const isDisabled = row === -1? true: false;
        const customId: string = genRandomId()
        const button: ButtonBuilder = new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(setIcon(row))
        .setStyle(ButtonStyle.Primary)
        .setDisabled(isDisabled);
        customIds.push(customId)
        buttons.push(button);
    }
    return [buttons, customIds]
}