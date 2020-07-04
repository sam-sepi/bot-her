module.exports = 
{
    name: 'charname',
    description: 'Character name',
    execute(message, args)
    {
        //DB INIT
        var Datastore = require('nedb'), db = new Datastore({ filename: './interlock-users.db', autoload: true });

        if(args[0] && args[0].length < 20)
        {
            db.findOne({userid: message.author.id}, (err, character) =>
            {
                if(character != null) 
                {
                    message.author.send('Esiste giù un personaggio associato all\'ID utente');
                }
                else
                {
                    user = 
                    {
                        userid: message.author.id,
                        name: args[0],
                        end: false
                    };

                    db.insert(user, (err, newCharacter) => 
                    {
                        message.channel.send(`Ora choomba diamo un ruolo al personaggio. Digita *!role*.`);
                        console.log(err);
                    });
                }
            })
        }
        else
        {
            message.channel.send('Invia un nome, inferiore a venti caratteri. *Esempio*: **!charname Joe**');
        }
    }
}