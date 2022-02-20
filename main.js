"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.on('ready', () => {
    var _a;
    console.log('The bot is ready');
    const guildId = "940737607866929195";
    const guild = client.guilds.cache.get(guildId);
    let commands;
    if (guild) {
        commands = guild.commands;
    }
    else {
        commands = (_a = client.application) === null || _a === void 0 ? void 0 : _a.commands;
    }
    commands === null || commands === void 0 ? void 0 : commands.create({
        name: 'access',
        description: 'Directs user to access info',
        options: [
            {
                name: 'username',
                description: 'Enter the username this message is directed towards',
                required: true,
                type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    });
    commands === null || commands === void 0 ? void 0 : commands.create({
        name: 'clarity',
        description: 'Viewing Cheggy solutions in high quality',
        options: [
            {
                name: 'username',
                description: 'Enter the username this message is directed towards',
                required: true,
                type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    });
});
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName, options } = interaction;
    if (commandName === 'access') {
        const username = options.getString('username');
        const statusEmbed = new discord_js_1.MessageEmbed()
            .setColor("#f2690d")
            .setAuthor({
            name: "Cheggy",
            iconURL: "https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg",
        })
            .setTitle("How to Unlock Access to Cheggy")
            .setDescription(`${username} for more info head over to #chegg-access`)
            .addFields({ name: "Paid Access:", value: "For $7.50 USD you will gain lifetime access to Cheggy", inline: false }, { name: "Free Access:", value: "3+ invites: One solution every 6 hours\n10+ invites: One solution every 2 hours\n20+ invites: One solution every 1 hour\n30+ invites: One solution every 30 minutes", inline: false })
            .setFooter({ text: 'Need more help? Feel free to open a ticket!.', iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg' });
        yield interaction.reply({ embeds: [statusEmbed], ephemeral: false });
        return;
    }
    else if (commandName === 'clarity') {
        const username = options.getString('username');
        const statusEmbed = new discord_js_1.MessageEmbed()
            .setColor("#f2690d")
            .setAuthor({
            name: "Cheggy",
            iconURL: "https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg",
        })
            .setTitle("How to View Solutions in High Quality")
            .setDescription(`${username} follow the steps outlined below:`)
            .addFields({ name: "Step 1:", value: "Right click on your solution", inline: false }, { name: "Step 2:", value: "Hit open link", inline: false })
            .setImage("https://cdn.discordapp.com/attachments/608334595510894612/944628255196082268/unknown_1.png")
            .setFooter({ text: 'Need more help? Feel free to open a ticket!.', iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg' });
        yield interaction.reply({ embeds: [statusEmbed], ephemeral: false });
        return;
    }
    else if (commandName === 'invites') {
        const username = options.getString('username');
        const statusEmbed = new discord_js_1.MessageEmbed()
            .setColor("#f2690d")
            .setAuthor({
            name: "Cheggy",
            iconURL: "https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg",
        })
            .setTitle("How to Create an Invite Link")
            .setDescription(`${username} follow the steps shown below:`)
            .setImage("https://cdn.discordapp.com/attachments/941746373332701184/944654414650671204/test.png")
            .setFooter({ text: 'Need more help? Feel free to open a ticket!.', iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg' });
        yield interaction.reply({ embeds: [statusEmbed], ephemeral: false });
        return;
    }
}));
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let userId = message.author.id;
    if ([
        "921943794910363683",
        "938139206318968842",
        "938139234898935808",
        "938139257065848882",
        "938139286035902464"
    ].includes(message.channel.id)
        || ((_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.cache.some(role => role.name === 'Moderator'))) {
        return;
    }
    else if (message.content.includes('https://www.chegg.com')) {
        yield message.delete();
        yield message.channel.send(`<@${userId}> I have deleted your chegg link. Please make sure to send your links in a chegg-access channel`);
    }
    else if (message.content.includes('https://discord.gg')) {
        yield message.delete();
        yield ((_b = message.member) === null || _b === void 0 ? void 0 : _b.timeout(1800000));
        yield message.channel.send(`<@${userId}> we have placed your account under a 30 minute timeout for violating Cheggy TOS.`);
    }
    else if (message.content.includes('https://')) {
        yield message.delete();
        yield message.channel.send(`<@${userId}> I have deleted your message, please refrain from sending links.`);
    }
}));
client.login(process.env.TOKEN);
