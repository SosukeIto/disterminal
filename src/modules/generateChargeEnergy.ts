import {ButtonBuilder, ButtonStyle, ActionRowBuilder} from 'discord.js';

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
function changeColor(n: number){
    if(n === -2 || n === -3){
        return ButtonStyle.Primary;
    }else if(n === -1){
        return ButtonStyle.Secondary;
    }else if(n === 0){
        return ButtonStyle.Success;
    }else{
        return ButtonStyle.Danger;
    }

}
export function generateChargeEnergy(panel: Record<string, number>[]): ActionRowBuilder<ButtonBuilder>[]{
    const buttons: ButtonBuilder[] = []
    const components: ActionRowBuilder<ButtonBuilder>[]= []
    for (let i = 0; i < panel.length; i++) {
        const route = panel[i];
        const routeNumber: string = Object.keys(route)[0];
        const isDisabled: boolean  = route[routeNumber] <= 0? true: false;
        const button: ButtonBuilder = new ButtonBuilder()
            .setCustomId(routeNumber)
            .setLabel(setIcon(route[routeNumber]))
            .setStyle(changeColor(route[routeNumber]))
            .setDisabled(isDisabled);

        buttons.push(button);
        if ((i + 1) % 5 === 0) {
            components.push(new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons));
            buttons.length = 0;
        }
    }
    if (buttons.length > 0) {
        components.push(new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons));
    }
    return components
}