const
	path = require('path'),
	Commando = require('discord.js-commando'),
	client = new Commando.Client({
		commandPrefix: '?',
		owner: '120602141537599488'
	});


client.registry
	// Registers your custom command groups
	.registerGroups([
		['main', 'Main commands'],
	])

	// Registers all built-in groups, commands, and argument types
	.registerDefaults()

	// Registers all of your commands in the ./commands/ directory
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('developing the quotebot');
});

client.on('error', console.error);

client.login(process.env.TOKEN);