"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateButton = generateButton;
const discord_js_1 = require("discord.js");
function generateButton(rows) {
    const buttons = [];
    for (const row of rows) {
        const button = new discord_js_1.ButtonBuilder()
            .setCustomId(Math.random().toString(36).slice(-16))
            .setLabel(row)
            .setStyle(discord_js_1.ButtonStyle.Primary);
        buttons.push(button);
    }
    return buttons;
}
