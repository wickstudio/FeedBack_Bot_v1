const { Client, Intents, MessageEmbed } = require('discord.js');
const Enmap = require('enmap');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
});

const db = new Enmap({
    name: "ratings"
});

const users = new Enmap({
    name: "usersrates"
});
client.on('message', async (message) => {
    if (message.content.startsWith("#" + 'rating')) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return
        var data = db.get(message.guild.id);
        if (data) return;
        var str = "";
        str += ' '.repeat(50);
        const exampleEmbed = new MessageEmbed()
            .setTitle(`**Rating <:null:850462447420440616><:null:850462447420440616><:null:850462447420440616><:null:850462447420440616><:null:850462447420440616> **`)
            .addFields({
                name: `0 average based on 0 reviews.`,
                value: '\u200B'
            })
            .addFields({
                name: '5 :star:',
                value: '\u200B',
                inline: true
            })
            .addField(`\`\`\`${str}\`\`\``, '\u200B', true)
            .addFields({
                name: 0,
                value: '\u200B',
                inline: true
            })
            .addFields({
                name: '4 :star:',
                value: '\u200B',
                inline: true
            })
            .addField(`\`\`\`${str}\`\`\``, '\u200B', true)
            .addFields({
                name: 0,
                value: '\u200B',
                inline: true
            })
            .addFields({
                name: '3 :star:',
                value: '\u200B',
                inline: true
            })
            .addField(`\`\`\`${str}\`\`\``, '\u200B', true)
            .addFields({
                name: 0,
                value: '\u200B',
                inline: true
            })
            .addFields({
                name: '2 :star:',
                value: '\u200B',
                inline: true
            })
            .addField(`\`\`\`${str}\`\`\``, '\u200B', true)
            .addFields({
                name: 0,
                value: '\u200B',
                inline: true
            })
            .addFields({
                name: '1 :star:',
                value: '\u200B',
                inline: true
            })
            .addField(`\`\`\`${str}\`\`\``, '\u200B', true)
            .addFields({
                name: 0,
                value: '\u200B',
                inline: true
            })
        var msg = await message.channel.send(exampleEmbed).then(msg => {
            return msg;
        })
        var emojes = "1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣".split(" ")
        await emojes.forEach(emoji => {
            msg.react(emoji);
        })
        db.set(`${message.guild.id}${msg.id}`, {
            msg: msg.id,
            _5stars: 0,
            _4stars: 0,
            _3stars: 0,
            _2stars: 0,
            _1stars: 0
        });
    }
})
//---------------------------------------------------------------------------
client.on("messageReactionAdd", async (reaction, user) => { // COde by 约 - Wick
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    var datauser = await users.get(`${user.id}${reaction.message.id}`)
    var data = await db.get(`${reaction.message.guild.id}${reaction.message.id}`)
    if (!data) return
    var emojes = "1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣".split(" ")
    var data1 = new Map()
    if (!emojes.includes(reaction.emoji.name) || user.id == client.user.id || reaction.message.id != data.msg) return
    if (datauser) {
        if (+datauser.emo == 1 && reaction.emoji.name == "1️⃣") return reaction.users.remove(user.id)
        if (+datauser.emo == 2 && reaction.emoji.name == "2️⃣") return reaction.users.remove(user.id)
        if (+datauser.emo == 3 && reaction.emoji.name == "3️⃣") return reaction.users.remove(user.id)
        if (+datauser.emo == 4 && reaction.emoji.name == "4️⃣") return reaction.users.remove(user.id)
        if (+datauser.emo == 5 && reaction.emoji.name == "5️⃣") return reaction.users.remove(user.id)
        if (+datauser.emo == 1) {
            data1.set("data", {
                _5stars: data._5stars,
                _4stars: data._4stars,
                _3stars: data._3stars,
                _2stars: data._2stars,
                _1stars: +data._1stars - 1
            })
            data._1stars = +data._1stars - 1
        }
        if (+datauser.emo == 2) {
            data1.set("data", {
                _5stars: data._5stars,
                _4stars: data._4stars,
                _3stars: data._3stars,
                _2stars: +data._2stars - 1,
                _1stars: data._1stars
            })
            data._2stars = +data._2stars - 1
        }
        if (+datauser.emo == 3) {
            data1.set("data", {
                _5stars: data._5stars,
                _4stars: data._4stars,
                _3stars: +data._3stars - 1,
                _2stars: data._2stars,
                _1stars: data._1stars
            })
            data._3stars = +data._3stars - 1
        }
        if (+datauser.emo == 4) {
            data1.set("data", {
                _5stars: data._5stars,
                _4stars: +data._4stars - 1,
                _3stars: data._3stars,
                _2stars: data._2stars,
                _1stars: data._1stars
            })
            data._4stars = +data._4stars - 1
        }
        if (+datauser.emo == 5) {
            data1.set("data", {
                _5stars: +data._5stars - 1,
                _4stars: data._4stars,
                _3stars: data._3stars,
                _2stars: data._2stars,
                _1stars: data._1stars
            })
            data._5stars = +data._5stars - 1
        }
    }
    if (reaction.emoji.name == "1️⃣") {
        data1.set("data", {
            _5stars: data._5stars,
            _4stars: data._4stars,
            _3stars: data._3stars,
            _2stars: data._2stars,
            _1stars: +data._1stars + 1
        })
        await reaction.message.reactions.message.reactions.cache.forEach(reactio => {
            reactio.users.remove(user.id)
        })
        await users.set(`${user.id}${reaction.message.id}`, {
            emo: 1
        })
        db.set(`${reaction.message.guild.id}${reaction.message.id}`, {
            msg: data.msg,
            _5stars: data._5stars,
            _4stars: data._4stars,
            _3stars: data._3stars,
            _2stars: data._2stars,
            _1stars: +data._1stars + 1
        })
    }
    if (reaction.emoji.name == "2️⃣") {
        data1.set("data", {
            _5stars: data._5stars,
            _4stars: data._4stars,
            _3stars: data._3stars,
            _2stars: +data._2stars + 1,
            _1stars: data._1stars
        })

        await users.set(`${user.id}${reaction.message.id}`, {
            emo: 2
        })
        db.set(`${reaction.message.guild.id}${reaction.message.id}`, {
            msg: data.msg,
            _5stars: data._5stars,
            _4stars: data._4stars,
            _3stars: data._3stars,
            _2stars: +data._2stars + 1,
            _1stars: data._1stars
        })
    }
    if (reaction.emoji.name == "3️⃣") {
        data1.set("data", {
            _5stars: data._5stars,
            _4stars: data._4stars,
            _3stars: +data._3stars + 1,
            _2stars: data._2stars,
            _1stars: data._1stars
        })
        await users.set(`${user.id}${reaction.message.id}`, {
            emo: 3
        })
        db.set(`${reaction.message.guild.id}${reaction.message.id}`, {
            msg: data.msg,
            _5stars: data._5stars,
            _4stars: data._4stars,
            _3stars: +data._3stars + 1,
            _2stars: data._2stars,
            _1stars: data._1stars
        })
    }
    if (reaction.emoji.name == "4️⃣") {
        data1.set("data", {
            _5stars: data._5stars,
            _4stars: +data._4stars + 1,
            _3stars: data._3stars,
            _2stars: data._2stars,
            _1stars: data._1stars
        })
        await users.set(`${user.id}${reaction.message.id}`, {
            emo: 4
        })
        db.set(`${reaction.message.guild.id}${reaction.message.id}`, {
            msg: data.msg,
            _5stars: data._5stars,
            _4stars: +data._4stars + 1,
            _3stars: data._3stars,
            _2stars: data._2stars,
            _1stars: data._1stars
        })
    }
    if (reaction.emoji.name == "5️⃣") {
        data1.set("data", {
            _5stars: +data._5stars + 1,
            _4stars: data._4stars,
            _3stars: data._3stars,
            _2stars: data._2stars,
            _1stars: data._1stars
        })
        await users.set(`${user.id}${reaction.message.id}`, {
            emo: 5
        })
        db.set(`${reaction.message.guild.id}${reaction.message.id}`, {
            msg: data.msg,
            _5stars: +data._5stars + 1,
            _4stars: data._4stars,
            _3stars: data._3stars,
            _2stars: data._2stars,
            _1stars: data._1stars
        })
    }
    var d = data1.get("data") //aurt#8400
    var _5star = Math.floor(Number(d._5stars));
    var _4star = Math.floor(Number(d._4stars));
    var _3star = Math.floor(Number(d._3stars));
    var _2star = Math.floor(Number(d._2stars));
    var _1star = Math.floor(Number(d._1stars));
    var maxVal = Math.max(_5star, _4star, _3star, _2star, _1star);
    var max = 50 //طول الخط
    var _5star_wd = _5star * max / maxVal;
    var _4star_wd = _4star * max / maxVal;
    var _3star_wd = _3star * max / maxVal;
    var _2star_wd = _2star * max / maxVal;
    var _1star_wd = _1star * max / maxVal;
    var all = (_5star + _4star + _3star + _2star + _1star)
    if (isNaN(_5star_wd)) _5star_wd = 0
    if (isNaN(_4star_wd)) _4star_wd = 0
    if (isNaN(_3star_wd)) _3star_wd = 0
    if (isNaN(_2star_wd)) _2star_wd = 0
    if (isNaN(_1star_wd)) _1star_wd = 0
    var bar5 = '░'.repeat(parseInt(_5star_wd)),
        str5 = "";
    if (parseInt(_5star_wd) < max) str5 += ' '.repeat(max - parseInt(_5star_wd))
    var bar4 = '░'.repeat(parseInt(_4star_wd)),
        str4 = "";
    if (parseInt(_4star_wd) < max) str4 += ' '.repeat(max - parseInt(_4star_wd))
    var bar3 = '░'.repeat(parseInt(_3star_wd)),
        str3 = "";
    if (parseInt(_3star_wd) < max) str3 += ' '.repeat(max - parseInt(_3star_wd))
    var bar2 = '░'.repeat(parseInt(_2star_wd)),
        str2 = "";
    if (parseInt(_2star_wd) < max) str2 += ' '.repeat(max - parseInt(_2star_wd))
    var bar1 = '░'.repeat(parseInt(_1star_wd)),
        str1 = "";
    if (parseInt(_1star_wd) < max) str1 += ' '.repeat(max - parseInt(_1star_wd))
    var avg_rating = (5 * Number(_5star) + 4 * Number(_4star) + 3 * Number(_3star) + 2 * Number(_2star) + 1 * Number(_1star)) / (Number(_5star) + Number(_4star) + Number(_3star) + Number(_2star) + Number(_1star));
    if (isNaN(avg_rating)) avg_rating = 0

    function getstars(data) {
        var arr = []
        for (var i = 0; i != 5; i++) {
            if (data >= 1) {
                arr.push("<:star:845725056122355773>") // One Star Emoji
                data = data - 1
            }
            if (data == 0.5) {
                data = 0
                arr.push("<:halft:850462411328061440>") // Half Star Emoji
            }
            if (data == 0 && arr.length != 5) {
                arr.push("<:null:850462447420440616>")
            } // Empty Star Emoji
        }
        return arr.join("")
    }

    const exampleEmbed = new MessageEmbed()
        .setTitle(`**Rating ${getstars(Math.round(avg_rating / 0.5) * 0.5)}**`)
        .addFields({
            name: `${avg_rating.toFixed(1)} average based on ${all} reviews.`,
            value: '\u200B'
        })
        .addFields({
            name: '5 :star:',
            value: '\u200B',
            inline: true
        })
        .addField(`\`\`\`${bar5}${str5}\`\`\``, '\u200B', true)
        .addFields({
            name: _5star,
            value: '\u200B',
            inline: true
        })
        .addFields({
            name: '4 :star:',
            value: '\u200B',
            inline: true
        })
        .addField(`\`\`\`${bar4}${str4}\`\`\``, '\u200B', true)
        .addFields({
            name: _4star,
            value: '\u200B',
            inline: true
        })
        .addFields({
            name: '3 :star:',
            value: '\u200B',
            inline: true
        })
        .addField(`\`\`\`${bar3}${str3}\`\`\``, '\u200B', true)
        .addFields({
            name: _3star,
            value: '\u200B',
            inline: true
        })
        .addFields({
            name: '2 :star:',
            value: '\u200B',
            inline: true
        })
        .addField(`\`\`\`${bar2}${str2}\`\`\``, '\u200B', true)
        .addFields({
            name: _2star,
            value: '\u200B',
            inline: true
        })
        .addFields({
            name: '1 :star:',
            value: '\u200B',
            inline: true
        })
        .addField(`\`\`\`${bar1}${str1}\`\`\``, '\u200B', true)
        .addFields({
            name: _1star,
            value: '\u200B',
            inline: true
        })
    if ((Math.round(avg_rating / 0.5) * 0.5) > 0) exampleEmbed.setColor('#f44336')
    if ((Math.round(avg_rating / 0.5) * 0.5) > 1) exampleEmbed.setColor('#ff9800')
    if ((Math.round(avg_rating / 0.5) * 0.5) > 2) exampleEmbed.setColor('#00bcd4')
    if ((Math.round(avg_rating / 0.5) * 0.5) > 3) exampleEmbed.setColor('#2196F3')
    if ((Math.round(avg_rating / 0.5) * 0.5) > 4) exampleEmbed.setColor('#04AA6D')
    await reaction.message.edit(exampleEmbed)
    await reaction.users.remove(user.id)
}) //Code by 约 - Wick

client.login("Your_Bot_Token"); // your bot token here
client.on('ready', () => {
    console.log('Bot is ready');
	console.log('Code by 约 - Wick')
})
