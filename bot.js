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
	member.guild.defaultChannel.send("Hello "+member.user);
});

client.on('guildMemberRemove', (member) => {
	member.guild.defaultChannel.send("We will miss you "+member.user);
});

client.on('message', message => {
	if (message.author.bot) return;
	var splitmessage = message.content.split(" ");
	var command = splitmessage[0];
//	for (i=0; i<splitmessage.length; i++){
//		message.channel.send(i+"ter command: "+splitmessage[i]);
//	}
	if (command === 'join'){
		if (splitmessage.length > 1){
			let role = message.guild.roles.find("name", splitmessage[1]);
			let member = message.member;
			member.addRole(role).catch(console.error);
			message.channel.send("You joined "+role);
		} else {
			message.channel.send("ich brauche mehr argumente")
		}
	}
	if (command === 'leave'){
		if (splitmessage.length > 1){
			let role = message.guild.roles.find("name", splitmessage[1]);
			let member = message.member;
			member.removeRole(role).catch(console.error);
			message.channel.send("You left "+role);
		} else {
			message.channel.send("Gib mir diese Argumente");
		}
	}
	if (message.content === 'yp'){
		let perms = message.channel.permissionsFor(message.member);
		message.channel.send(perms);
	}
});

