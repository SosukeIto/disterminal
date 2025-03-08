import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();
const inviteURL: string = "https://discord.com/oauth2/authorize?client_id=1348023318128889977&permissions=0&integration_type=0&scope=bot";
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    
    if (message.content === "mminv") {
        message.reply(inviteURL);
    }
});

client.login(process.env.DISCORD_TOKEN);