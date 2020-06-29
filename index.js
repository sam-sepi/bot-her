//Discord file system
const fs = require('fs');

//Import Discord Libr.
const Discord = require('discord.js');

//Conf file
const { prefix, token } = require('./config.json');

//Client Obj. https://discordpy.readthedocs.io/en/latest/api.html
const client = new Discord.Client();

//Collection Obj. https://discordjs.guide/additional-info/collections.html
//Discord.Collection extends Js MAP https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Map
client.commands = new Discord.Collection();

//Read files in commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//loop 
for (const file of commandFiles) 
{
	const command = require(`./commands/${file}`);

	//set is method of JS MAP https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
	//loop command in array commands
	client.commands.set(command.name, command);
}

//console log when online
client.once('ready', () => 
{
	console.log('Ready!');
});

//The on() method attaches one or more event handlers for the selected elements and child elements.
//function param required. Specifies the function to run when the event occurs
client.on('message', message => 
{
	//exit if
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	//The slice() method returns the selected elements in an array, as a new array object.
	const args = message.content.slice(prefix.length).split(/ +/);
	
	//The shift() method removes the first item of an array and to lower
	const command = args.shift().toLowerCase();

	//if command not in array commands
	if(!client.commands.has(command)) return;

	try {
        //get and execute
        client.commands.get(command).execute(message, args);

    } catch(error) 
    {	//or print error
		console.error(error);
		message.reply('TORNELLO! Comando non riconosciuto');
	}
});

//WELCOME
client.on('guildMemberAdd', member => 
{
	member.send("Ehi Choomba benvenuto nel server TEST. Per creare il tuo personaggio, vai nel canale *build* e digita *!charname* seguito dal nome che vuoi assegnargli. Ad esempio Esempio: !charname Joe");
});

client.login(token);