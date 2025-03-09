"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDevice = generateDevice;
const discord_js_1 = require("discord.js");
function genRandomId() {
    return Math.random().toString(36).slice(-16);
}
function setIcon(row) {
    if (row === -1) {
        return "_";
    }
    else if (row === -2) {
        return "🔋";
    }
    else if (row === -3) {
        return "🌑";
    }
    else {
        return `${row}`;
    }
}
function generateDevice(rows) {
    const buttons = [];
    const customIds = [];
    for (const row of rows) {
        const isDisabled = row === -1 ? true : false;
        const customId = genRandomId();
        const button = new discord_js_1.ButtonBuilder()
            .setCustomId(customId)
            .setLabel(setIcon(row))
            .setStyle(discord_js_1.ButtonStyle.Primary)
            .setDisabled(isDisabled);
        customIds.push(customId);
        buttons.push(button);
    }
    return [buttons, customIds];
}
