"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const inviteURL = "https://discord.com/oauth2/authorize?client_id=1348023318128889977&permissions=0&integration_type=0&scope=bot";
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
client.once("ready", () => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
});
client.on("messageCreate", (message) => {
    if (message.author.bot)
        return;
    if (message.content === "mminv") {
        message.reply(inviteURL);
    }
});
client.login(process.env.DISCORD_TOKEN);
