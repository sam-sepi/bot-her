module.exports = 
{
    name: 'end',
    description: 'Character finalization',
    execute(message, args)
    {
        var Datastore = require('nedb');
        db = {};
        db.users = new Datastore({ filename: './interlock-users.db', autoload: true });
        db.stats = new Datastore({ filename: './interlock-stats.db', autoload: true });
        db.skills = new Datastore({ filename: './interlock-skills.db', autoload: true });
        db.freeskills = new Datastore({ filename: './interlock-freeskills.db', autoload: true });

        stats = ['Intelligenza', 'Freddezza', 'Empatia', 'Tecnologia', 'Riflessi', 'Costituzione', 'Fascino'];
        var stat_toString = stats.join(', ');

        db.stats.find({userid: message.author.id}, (err, character) => 
        {
            let list_stats = [];
            let rank_sum = [];

            for(i = 0; i < character.length; i++)
            {
                rank_sum[i] = parseInt(character[i]['rank']);
                list_stats[i] = character[i]['stat'];
            }

            if(list_stats.length === stats.length)
            {
                if(rank_sum.reduce((a, b) => a + b, 0) == 50)
                {
                    let sum_rank = [];

                    db.skills.find({userid: message.author.id}, (err, char) => 
                    {
                        for(i = 0; i < char.length; i++)
                        {
                            sum_rank[i] = parseInt(char[i]['rank']);
                        }

                        if(sum_rank.reduce((a, b) => a + b, 0) == 40)
                        {
                            db.freeskills.find({userid: message.author.id}, (err, chr) => 
                            {
                                let fs_rank = [];

                                for(i = 0; i < chr.length; i++)
                                {
                                    fs_rank[i] = parseInt(chr[i]['rank']);
                                }

                                if(fs_rank.reduce((a, b) => a + b, 0) == 12)
                                {
                                    db.users.update({userid: message.author.id}, {$set: {end: true}}, {}, (err, replc) => 
                                    {
                                        if(replc == 1)
                                        {
                                            message.channel.send(`Finalizzazione del personaggio completata. Ben fatto Choomba!`);
                                        }
                                    });
                                }
                                else
                                {
                                    message.channel.send(`La somma dei punti spesi nelle skills professionali non è corretta. Deve essere 12. Digita **!freeskill** per aggiornare e modificare le abilità non professionali`);
                                }
                            });
                        }
                        else
                        {
                            message.channel.send(`La somma dei punti spesi nelle **skills professionali** non è corretta, deve essere 40. Col comando *!skills* puoi aggiornare e modificare quelle inserite`);
                        }
                    });
                }
                else
                {
                    message.channel.send(`La somma dei punti spesi non è corretta, deve raggiungere 50. Dai un valore da 3 a 10 a tutte queste abilità ${stat_toString}. Puoi aggiornare quelle già inserite. **Occhio alla maiuscola**! Es.: !stat Freddezza 4.`);
                }
            }
            else
            {
                message.channel.send(`Il numero delle statistiche non è corretto. Dai un valore da 3 a 10 a tutte queste abilità ${stat_toString}. Puoi aggiornare quelle già inserite. Il totale dei punti spesi deve essere 50. **Occhio alla maiuscola**! Es.: !stat Freddezza 4.`);
            }
        });
    }
}