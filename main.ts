import DiscordJS, {Intents, MessageEmbed, TextChannel} from 'discord.js'
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

    const guildId = "938954164455764049"
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
    commands?.create({
        name: 'invite-tutorial',
        description: 'How create an invite link',
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

    const {commandName, options} = interaction

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
            .setDescription(`${username} for more info head over to #access`)
            .addFields(
                {name: "Paid Access:", value: "For $7.50 USD you will gain lifetime access to Cheggy", inline: false},
                {
                    name: "Free Access:",
                    value: "3+ invite joins: One solution every 24 hours\n10+ invite joins: One solution every 12 hours\n20+ invite joins: One solution every 6 hours\n30+ invite joins: One solution every 3 hours",
                    inline: false
                }
            )
            .setFooter({
                text: 'Need more help? Feel free to open a ticket!',
                iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg'
            });

        await interaction.reply({embeds: [statusEmbed], ephemeral: false});

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
                {name: "Step 1:", value: "Right click on your solution", inline: false},
                {name: "Step 2:", value: "Hit open link", inline: false}
            )
            .setImage("https://cdn.discordapp.com/attachments/608334595510894612/944628255196082268/unknown_1.png")
            .setFooter({
                text: 'Need more help? Feel free to open a ticket!',
                iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg'
            });

        await interaction.reply({embeds: [statusEmbed], ephemeral: false});

        return;
    } else if (commandName === 'invite-tutorial') {
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
            .setFooter({
                text: 'Need more help? Feel free to open a ticket!',
                iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg'
            });

        await interaction.reply({embeds: [statusEmbed], ephemeral: false});

        return;
    }
})


client.on('messageCreate', async (message) => {
    if (message.member?.roles.cache.some(role => (role.name === 'Moderator' || role.name === 'Helper' || role.name === 'BOT'))) {
        return;
    } else if (((message.channel as DiscordJS.TextChannel).name).startsWith("ticket")) {
        return;
    }

    let channel: TextChannel
    let freeAccess: boolean = false
    let premiumAccess: boolean = false
    let freeChannel: boolean = false
    let premiumChannel: boolean = false

    let userId: string = message.author.id;

    let reply: string = "";
    const replyMessages = {
        "chegg no access": `<@${userId}> to learn how to gain access please head on over to ${message.guild!.channels.cache.get("952233763281182810")!.toString()}`,
        "chegg with premium access": `<@${userId}> Please use the "/chegg" command in ${message.guild!.channels.cache.get("953088587631591474")!.toString()}`,
        "chegg with free access": `<@${userId}> Please use the "/chegg" command in ${message.guild!.channels.cache.get("952233500847792178")!.toString()}`,
        "advertisement": `<@${userId}> we have placed your account under a 15 minute timeout for violating Cheggy ${message.guild!.channels.cache.get("952236909135032340")!.toString()}`,
        "link": `<@${userId}> I have deleted your message, please refrain from sending links.`
    };


    if (message.member?.roles.cache.some(role => (role.name === 'premium'))) {
        premiumAccess = true
    } else if (message.member?.roles.cache.some(role => (
        role.name === '3 Hour' ||
        role.name === '6 Hour' ||
        role.name === '12 Hour' ||
        role.name === '24 Hour'
    ))) {
        freeAccess = true
    }

    if (message.channel.id === "953088587631591474") {
        premiumChannel = true
    } else if (message.channel.id === "952233500847792178") {
        freeChannel = true
    }


    if (message.content.includes('https://discord.gg')) {
        await message.member?.timeout(900000);
        reply = replyMessages["advertisement"];
    } else if (message.content.includes('https://')) {
        reply = replyMessages["link"];
    }


    if ((premiumAccess && !premiumChannel) || (freeAccess && !freeChannel)) {

        channel = client.channels.cache.get("961389836344905768") as TextChannel;

        if (message.content.includes('https://www.chegg.com')) {
            if (premiumAccess) {
                reply = replyMessages["chegg with premium access"];
            } else {
                reply = replyMessages["chegg with free access"];
            }
        }

    } else if (((premiumAccess && premiumAccess) || (freeAccess && freeChannel)) && message.content.includes('https://www.chegg.com')) {

        if (premiumChannel) {
            channel = client.channels.cache.get("953088587631591474") as TextChannel;
        } else {
            channel = client.channels.cache.get("952233500847792178") as TextChannel;
        }

        await channel.send({
            embeds: [{
                title: `Make sure to use /chegg`,
                description: `<@${userId}> feel free to open a ticket if you require additional assistance!`,
                image: {url: 'https://cdn.discordapp.com/attachments/598334621498736650/961439354885132318/unknown.png'}
            }]
        })

        try {
            await message.delete()
        } catch {
            return;
        }

        reply = "dddd"

    } else {

        channel = client.channels.cache.get("961389836344905768") as TextChannel;

        if (message.content.includes('https://www.chegg.com')) {
            if (premiumAccess) {
                reply = replyMessages["chegg with premium access"];
            } else {
                reply = replyMessages["chegg no access"];
            }
        }
    }


    if (reply !== "") {
        try {
            await message.delete()
        } catch {
            return;
        }

        await channel.send(reply);
    }
})


client.login(process.env.DISCORD_TOKEN)