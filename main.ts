import DiscordJS, {Intents, TextChannel, MessageActionRow, MessageButton, MessageEmbed} from 'discord.js'
import dotenv from 'dotenv'


function accessMessage(username: string, support: string) {
    return new MessageEmbed()

        .setColor("#f2690d")
        .setAuthor({
            name: "Cheggy",
            iconURL:
                "https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg",
        })
        .setTitle("How to Unlock Access to Cheggy")
        .setDescription(`${username} for more info check out ${support}`)
        .addFields(
            {name: "Paid Access:", value: "For $7.50 USD you will gain lifetime access to Cheggy", inline: false},
            {
                name: "Free Access:",
                value:
                    "3+ invite joins: 24 hour access\n" +
                    "10+ invite joins: 12 hour access\n" +
                    "20+ invite joins: 6 hour access\n" +
                    "30+ invite joins: 3 hour access",
                inline: false
            }
        )
        .setFooter({
            text: 'Need more help? Feel free to open a ticket!',
            iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg'
        });
}

dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


client.on('ready', async () => {
    console.log('Overseer is online!')


    const welcomeChannel = client.channels.cache.get('952233283566067742') as TextChannel;
    const messages = await welcomeChannel.messages.fetch({limit: 100});
    const messagesByAuthor = messages.filter(m => m.author.id === '952584258889859082');
    await welcomeChannel.bulkDelete(messagesByAuthor);

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('verify')
                .setLabel('Click to Verify')
                .setStyle('PRIMARY'),
        );

    const channel = client.channels.cache.get('952233283566067742') as TextChannel;
    await channel.send({components: [row]});


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
    if (interaction.isButton()) {
        const member = interaction.member as DiscordJS.GuildMember;

        if (interaction.customId == "verify" && !member.roles.cache.has('952587050715066460')) {
            await member.roles.add('952587050715066460');

            await interaction.reply({
                content: "You've successfully been verified!",
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: "You've already been verified!",
                ephemeral: true
            });
        }
    }

    if (!interaction.isCommand()) {
        return
    }

    const {commandName, options} = interaction

    if (commandName === 'access') {
        const username = options.getString('username')!
        const statusEmbed = accessMessage(username, interaction.guild!.channels.cache.get("952233763281182810")!.toString());

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
    if (message.member?.roles.cache.some(role => (role.name === 'Moderator' || role.name === 'Helper' || role.name === 'BOT')) || message.channelId === "963886505154199582") {
        return;
    } else if (((message.channel as DiscordJS.TextChannel).name).startsWith("ticket")) {
        message.channel.messages.fetch({limit: 100}).then(async history => {
            let messages: string[] = []

            history.forEach(message => messages.push(message.content))
            messages.reverse()

            if (messages.length < 4) {
                let userId = (messages.at(0)?.match(/\d+/g))!.toString()
                const member: DiscordJS.GuildMember = await message.guild!.members.fetch(userId)

                for (let text of messages.slice(0, 3)) {
                    if (!(member!.roles.cache.hasAny(
                            "952021257870790678",
                            "952419492577832980",
                            "952419298196996116",
                            "952351244532482098",
                            "952350649335554068"
                        )) &&
                        (text.includes("https://www.chegg.com" || "/chegg"))) {

                        const accessEmbed = accessMessage(`<@${userId}>`, message.guild!.channels.cache.get("952233763281182810")!.toString());

                        await message.channel.send({embeds: [accessEmbed]});
                        return;
                    }


                }
            }
        })

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
        "chegg no access": `<@${userId}> to learn how to gain access please check out ${message.guild!.channels.cache.get("952233763281182810")!.toString()}`,
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

        if (message.content.includes('https://www.chegg.com' || "/chegg")) {
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
            embeds: [new MessageEmbed()
                .setColor("#f2690d")
                .setAuthor({
                    name: "Cheggy",
                    iconURL:
                        "https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg",
                })
                .setTitle("Not sure how to send your question?")
                .setDescription(`<@${userId}> follow the steps shown below:`)
                .setImage("https://cdn.discordapp.com/attachments/952069091986903100/962737822022893598/unknown.png")
                .setFooter({
                    text: 'Need more help? Feel free to open a ticket!',
                    iconURL: 'https://cdn.discordapp.com/attachments/608334595510894612/944624021692092506/Cheggy_Logo.jpg'
                })]
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