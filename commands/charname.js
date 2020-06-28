module.exports = 
{
    name: 'charname',
    description: 'Character name',
    execute(message, args)
    {
        help = {};
        help.duplicate = 'Esiste giù un personaggio associato all\'ID utente';
        help.len = 'Invia un nome, inferiore a venti caratteri. Esempio: *!charname Joe*';
        help.name = 'Inserisci il nome del tuo personaggio, utilizzando il comando *!charname* seguito dal nome scelto. Esempio: *!charname Joe*';

        data = {};

        //DB INIT
        var Datastore = require('nedb'), db = new Datastore({ filename: './interlock-users.db', autoload: true });

        if(args[0] && args[0].length < 20)
        {
            db.findOne({userid: message.author.id}, (err, character) =>
            {
                if(character != null) 
                {
                    message.author.send(help.duplicate);
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
                        console.log(err);
                    });
                }
            })
        }
        else
        {
            message.channel.send(help.len);
        }
    }
}