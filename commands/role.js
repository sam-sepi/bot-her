module.exports = 
{
    name: 'role',
    description: 'Character role',
    execute(message, args)
    {
        //DB INIT
        var Datastore = require('nedb'), db = new Datastore({ filename: './interlock-users.db', autoload: true });

        roles = ['Rocker', 'Solitario', 'Netrunner', 'Tecnico', 'Reporter', 'Poliziotto', 'Corporativo', 'Ricettatore', 'Nomade'];

        var roles_toString = roles.join(', ');

        if(args[0])
        {
            let role = args[0];

            if(roles.includes(role))
            {  
                db.update({ userid: message.author.id }, {$set: { role: role }}, {}, function(err, numReplaced) 
                {
                    message.channel.send('Bene Choomba, ora dobbiamo inserire le statistiche. Digita !stat');
                    console.log("replaced: " + numReplaced);
                });
            }
            else
            {
                message.channel.send(`Seleziona una classe digitando il comando *!role* seguito da una delle seguenti scelte: ${roles_toString}. **Attenzione alla maiuscola**. Ex.: !role Solitario`);
            }
        }
        else
        {
            message.channel.send(`Seleziona una classe digitando il comando *!role* seguito da una delle seguenti scelte: ${roles_toString}. **Attenzione alla maiuscola**. Ex.: !role Solitario`);
        }
    }
}