"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateButton = generateButton;
const discord_js_1 = require("discord.js");
function genRandomId() {
    return Math.random().toString(36).slice(-16);
}
function generateButton(rows) {
    const buttons = [];
    const customIds = [];
    for (const row of rows) {
        const customId = genRandomId();
        const button = new discord_js_1.ButtonBuilder()
            .setCustomId(customId)
            .setLabel(row)
            .setStyle(discord_js_1.ButtonStyle.Primary);
        customIds.push(customId);
        buttons.push(button);
    }
    return [buttons, customIds];
}
