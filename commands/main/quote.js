const
	Discord = require('discord.js'),
	{ Command } = require('discord.js-commando');

module.exports = class QuoteCommand extends Command {
	constructor(client) {
			super(client, {
					name: 'quote',
					group: 'main',
					memberName: 'quote',
					description: 'Quotes a message : `!quote <messageID> [<channelID>] [guildID] § Comment ...`',
			});
	}

	async run(message) {
		const realText = message.argString.trim();
		let [args, comment] = realText.split(/\s*§\s*/);
		let [quoted, channelID, guild] = args.split(' ');

		let fetched;

		if (!channelID) {
			fetched = await message.channel.fetchMessage(quoted)
				.then(message => message)
				.catch(err => console.log(er));
		} else if (channelID && !guild) {
			fetched = await message.guild.channels.get(channelID).fetchMessage(quoted)
				.then(message => message)
				.catch(err => console.log(err));
		}

		const embed = new Discord.RichEmbed()
			.setColor('#7E0097')
			.setAuthor(`${fetched.author.username} a dit :`, fetched.author.avatarURL)
			.setDescription(fetched.content)
			.setFooter(`Dans #${fetched.channel.name} sur le serveur ${fetched.channel.guild.name}, par ${message.author.username}`);

		await message.delete();

		return message.embed(embed, comment || '');
	}
};
