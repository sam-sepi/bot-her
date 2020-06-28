module.exports = 
{
    name: 'role',
    description: 'Character role',
    execute(message, args)
    {
        //DB INIT
        var Datastore = require('nedb'), db = new Datastore({ filename: './interlock-users.db', autoload: true });

        roles = ['Rocker', 'Solitario', 'Netrunner', 'Tecnico', 'Reporter', 'Poliziotto', 'Corporativo', 'Ricettatore', 'Nomade'];

        if(args[0])
        {
            let role = args[0].toLowerCase();
            var roles_toString = roles.join(', ');

            if(roles.includes(role))
            {  
                db.update({ userid: message.author.id }, {$set: { role: role }}, {}, function(err, numReplaced) 
                {
                    console.log("replaced: " + numReplaced);
                });
            }
            else
            {
                message.channel.send(`Seleziona una classe digitando il comando *!role* seguito da una delle seguenti scelte: ${roles_toString}. Ex.: !role solitario`);
            }
        }
        else
        {
            message.channel.send(`Seleziona una classe digitando il comando *!role* seguito da una delle seguenti scelte: ${roles_toString}. Ex.: !role solitario`);
        }
    }
}