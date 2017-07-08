const Discord = require('discord.js');
const logger = require('winston');
const package = require('./package.json');
const client = new Discord.Client();
client.login(package.token);

client.on('ready', () => {
	console.log('I am ready!');
	logger.info('my name is ' + package.name + '. Ready to serve!');
});

client.on('guildMemberAdd', (member) => {
	message.channel.send("Hello "+member.user);
});

client.on('guildMemberRemove', (member) => {
	message.channel.send("We will miss you "+member.user);
});

client.on('message', message => {
	if (message.content === 'addme'){
		let role = message.guild.roles.find("name", "Administrator");
		let member = message.member;
		member.addRole(role).catch(console.error);
		message.channel.send("added you");
	}
	if (message.content === 'remme'){
		let role = message.guild.roles.find("name", "Administrator");
		let member = message.member;
		member.removeRole(role).catch(console.error);
		message.channel.send("removed you");
	}
	if (message.content === 'yp'){
		let perms = message.channel.permissionsFor(message.member);
		message.channel.send(perms);
	}
});

