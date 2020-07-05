module.exports = 
{
    name: 'role',
    description: 'Character role',
    execute(message, args)
    {
        //DB INIT
        var Datastore = require('nedb'), db = new Datastore({ filename: './interlock-users.db', autoload: true });

        //ROLES LIST
        roles = ['rocker', 'solitario', 'netrunner', 'tecnico', 'reporter', 'poliziotto', 'corporativo', 'ricettatore', 'nomade'];

        //ROLES TO STRING
        var roles_toString = roles.join(', ');

        //ARG after command
        if(args[0])
        {
            let role = args[0].toLowerCase();

            //IF IN ROLES LIST
            if(roles.includes(role))
            {  
                db.update({ userid: message.author.id }, {$set: { role: role }}, {}, function(err, numReplaced) 
                {
                    message.channel.send('Bene Choomba, ora dobbiamo inserire le statistiche. Digita !stat');
                    console.log("replaced: " + numReplaced);
                });
            }
            else //NOT IN ROLES LIST
            {
                message.channel.send(`Seleziona una classe digitando il comando *!role* seguito da una delle seguenti scelte: ${roles_toString}. Ex.: !role solitario`);
            }
        }
        else
        {
            //TUTORIAL MSG
            message.channel.send(`Seleziona una classe digitando il comando *!role* seguito da una delle seguenti scelte: ${roles_toString}. *Esempio*: **!role solitario**`);
        }
    }
}