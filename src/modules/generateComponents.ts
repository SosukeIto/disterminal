import {ButtonBuilder, ButtonStyle, ActionRowBuilder} from 'discord.js';


export function generateComponents(terminalRoute: Record<string, number>[]): ActionRowBuilder<ButtonBuilder>[]{
    const buttons: ButtonBuilder[] = []
    const components: ActionRowBuilder<ButtonBuilder>[]= []
    for(let i = 0; i < terminalRoute.length; i++){
        if (i % 5 === 0 && i != 0){
            const row: ActionRowBuilder<ButtonBuilder>= new ActionRowBuilder<ButtonBuilder>().addComponents(buttons);
            components.push(row)
            buttons.length = 0
        }   
        const route = terminalRoute[i]
        const routeNumber: string = Object.keys(route)[0];
        const button: ButtonBuilder = new ButtonBuilder()
            .setCustomId(routeNumber)
            .setLabel(route[routeNumber].toString())
            .setStyle(ButtonStyle.Primary) 
        buttons.push(button)       
    }
    return components
}