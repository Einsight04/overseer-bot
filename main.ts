import DiscordJS, { Intents, Message, MessageEmbed, User } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


client.on('ready', () => {
    console.log('The bot is ready')

    const guildId = "940737607866929195"
    const guild = client.guilds.cache.get(guildId)

    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'access',
        description: 'Directs user to access info',
        options: [
            {
                name: 'username',
                description: 'Enter the username this message is directed towards',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })
    commands?.create({
        name: 'clarity',
        description: 'Viewing Cheggy solutions in high quality',
        options: [
            {
                name: 'username',
                description: 'Enter the username this message is directed towards',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })
})


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'access') {
        const username = options.getString('username')!
        const statusEmbed = new MessageEmbed()

            .setColor("#f2690d")
            .setAuthor({
                name: "Cheggy",
                iconURL:
                    "https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg",
            })
            .setTitle("How to Unlock Access to Cheggy")
            .setDescription(`${username} for more info head over to #chegg-access`)
            .addFields(
                { name: "Paid Access:", value: "For $7.50 USD you will gain lifetime access to Cheggy", inline: false },
                { name: "Free Access:", value: "3+ invites: One solution every 6 hours\n10+ invites: One solution every 2 hours\n20+ invites: One solution every 1 hour\n30+ invites: One solution every 30 minutes", inline: false }
            )
            .setFooter({ text: 'Need more help? Feel free to open a ticket!.', iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg' });

        await interaction.reply({ embeds: [statusEmbed], ephemeral: false });

        return;
    } else if (commandName === 'clarity') {
        const username = options.getString('username')!
        const statusEmbed = new MessageEmbed()

            .setColor("#f2690d")
            .setAuthor({
                name: "Cheggy",
                iconURL:
                    "https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg",
            })
            .setTitle("How to View Solutions in High Quality")
            .setDescription(`${username} follow the steps outlined below:`)
            .addFields(
                { name: "Step 1:", value: "Right click on your solution", inline: false },
                { name: "Step 2:", value: "Hit open link", inline: false }
            )
            .setImage("https://cdn.discordapp.com/attachments/608334595510894612/944628255196082268/unknown_1.png")
            .setFooter({ text: 'Need more help? Feel free to open a ticket!.', iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg' });

        await interaction.reply({ embeds: [statusEmbed], ephemeral: false });

        return;
    } else if (commandName === 'invites') {
        const username = options.getString('username')!
        const statusEmbed = new MessageEmbed()

            .setColor("#f2690d")
            .setAuthor({
                name: "Cheggy",
                iconURL:
                    "https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg",
            })
            .setTitle("How to Create an Invite Link")
            .setDescription(`${username} follow the steps shown below:`)
            .setImage("https://cdn.discordapp.com/attachments/941746373332701184/944654414650671204/test.png")
            .setFooter({ text: 'Need more help? Feel free to open a ticket!.', iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg' });

        await interaction.reply({ embeds: [statusEmbed], ephemeral: false });

        return;
    }
})


client.on('messageCreate', async (message) => {
    let userId = message.author.id

    if ([
        "921943794910363683",
        "938139206318968842",
        "938139234898935808",
        "938139257065848882",
        "938139286035902464"
    ].includes(message.channel.id)
        || message.member?.roles.cache.some(role => role.name === 'Moderator')) {
        return
    } else if (message.content.includes('https://www.chegg.com')) {
        await message.delete()
        await message.channel.send(`<@${userId}> I have deleted your chegg link. Please make sure to send your links in a chegg-access channel`)
    } else if (message.content.includes('https://discord.gg')) {
        await message.delete()
        await message.member?.timeout(1800000)
        await message.channel.send(`<@${userId}> we have placed your account under a 30 minute timeout for violating Cheggy TOS.`)
    } else if (message.content.includes('https://')) {
        await message.delete()
        await message.channel.send(`<@${userId}> I have deleted your message, please refrain from sending links.`)
    }
})


client.login(process.env.TOKEN)