module.exports = 
{
    name: 'stat',
    description: 'Stat Select',
    execute(message, args)
    {
        //DB INIT
        var Datastore = require('nedb');

        db = {};
        db.stats = new Datastore({ filename: './interlock-stats.db', autoload: true });
        db.users = new Datastore({ filename: './interlock-users.db', autoload: true });

        //Stats list
        stats = ['intelligenza', 'freddezza', 'empatia', 'tecnologia', 'riflessi', 'costituzione', 'fascino'];
        var stat_toString = stats.join(', ');

        //Arg after command
        if(args[0])
        {
            //search role in db
            db.users.findOne({ userid: message.author.id}, (err, character) =>
            {
                if(character.role == null)
                {
                    //send msg if role is not in db
                    message.channel.send(`Prima devi selezionare il tuo ruolo. Scegli tra ${roles_toString}`);
                }
                else
                {
                    //arg to lower
                    args[0] = args[0].toLowerCase();
                    //if arg is in array
                    if(stats.includes(args[0]))
                    {
                        if(isNaN(args[1])) //if not a int
                        {
                            message.channel.send(`Per registrare la statistica ${args[0]} devi far seguire un numero. *Esesmpio*: **!stat freddezza 4.**`);
                        }
                        else
                        {   //range
                            if(args[1] > 2 && args[1] < 11)
                            {
                                stat = 
                                {
                                    userid: message.author.id,
                                    name: character.name,
                                    stat: args[0],
                                    rank: args[1]
                                };
                                //check is already exists
                                db.stats.findOne({userid: message.author.id, stat: args[0]}, (err, character) => 
                                {
                                    if(character == null)
                                    {   //insert
                                        db.stats.insert(stat, (err, newCharacter) => 
                                        {
                                            console.log(err);
                                            message.channel.send(`Statistica ${args[0]} inserita. Quando hai terminato con **tutte** le statistiche digita *!skill*`);
                                        });
                                    }
                                    else
                                    {   //update
                                        db.stats.update({userid: message.author.id, stat: args[0]}, {$set: {rank: args[1]}}, {}, (err, numReplaced) => 
                                        {
                                            console.log(numReplaced);
                                            message.channel.send(`Statistica ${args[0]} aggiornata. Se ancora non hai inserito le abilità digita *!skill*`);
                                        });
                                    }
                                });
                            }
                            else
                            {   //not in range
                                message.channel.send(`La statistica ${args[0]} deve essere compresa tra 3 e 10`);
                            }
                        }
                    }
                    else
                    {   
                        //not arg after commands
                        message.channel.send(`Devi selezionare le statistiche del tuo personaggio. Dai un valore da 3 a 10 **a tutte** queste abilità ${stat_toString}. Il totale deve essere 45. *Esesmpio*: **!stat freddezza 4.**`);
                    }
                }
            });
        }
        else
        {   
            //TUTORIAL MSG
            message.channel.send(`Devi selezionare le statistiche del tuo personaggio. Dai un valore da 3 a 10 **a tutte** queste abilità ${stat_toString}. Il totale deve essere 45. *Esesmpio*: **!stat freddezza 4.**`);
        }
    }
}