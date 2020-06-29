module.exports = 
{
    name: 'stat',
    description: 'Stat Select',
    execute(message, args)
    {
        var Datastore = require('nedb');

        db = {};
        db.stats = new Datastore({ filename: './interlock-stats.db', autoload: true });
        db.users = new Datastore({ filename: './interlock-users.db', autoload: true });

        stats = ['Intelligenza', 'Freddezza', 'Empatia', 'Tecnologia', 'Riflessi', 'Costituzione', 'Fascino'];

        if(args[0])
        {
            db.users.findOne({ userid: message.author.id}, (err, character) =>
            {
                if(character.role == null)
                {
                    message.channel.send(`Prima devi selezionare il tuo ruolo. Scegli tra ${roles_toString}`);
                }
                else
                {
                    if(stats.includes(args[0]))
                    {
                        if(isNaN(args[1]))
                        {
                            message.channel.send(`Per registrare la statistica ${args[0]} devi far seguire un numero. *Occhio alla maiuscola*! Es.: !stat Freddezza 4.`);
                        }
                        else
                        {
                            if(args[1] > 2 && args[1] < 11)
                            {
                                stat = 
                                {
                                    userid: message.author.id,
                                    name: character.name,
                                    stat: args[0],
                                    rank: args[1]
                                };

                                db.stats.findOne({userid: message.author.id, stat: args[0]}, (err, character) => 
                                {

                                    if(character == null)
                                    {
                                        db.stats.insert(stat, (err, newCharacter) => 
                                        {
                                            console.log(err);
                                            message.channel.send(`Statistica ${args[0]} inserita. Quando hai terminato con le statistiche digita *!skill*`);
                                        });
                                    }
                                    else
                                    {
                                        db.stats.update({userid: message.author.id, stat: args[0]}, {$set: {rank: args[1]}}, {}, (err, numReplaced) => 
                                        {
                                            console.log(numReplaced);
                                            message.channel.send(`Statistica ${args[0]} aggiornata. Se ancora non hai inserito le abilità digita *!skill*`);
                                        });
                                    }
                                });
                            }
                            else
                            {
                                message.channel.send(`La statistica ${args[0]} deve essere compresa tra 3 e 10`);
                            }
                        }
                    }
                    else
                    {
                        var stat_toString = stats.join(', ');
                        message.channel.send(`Devi selezionare le statistiche del tuo personaggio. Dai un valore da 3 a 10 a tutte queste abilità ${stat_toString}. Il totale deve essere 50. **Occhio alla maiuscola**! Es.: !stat Freddezza 4.`);
                    }
                }
            });
        }
        else
        {
            var stat_toString = stats.join(', ');
            message.channel.send(`Devi selezionare le statistiche del tuo personaggio. Dai un valore da 3 a 10 a tutte queste abilità ${stat_toString}. Il totale deve essere 50. **Occhio alla maiuscola**! Es.: !stat Freddezza 4.`);
        }
    }
}