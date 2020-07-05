module.exports = 
{
    name: 'end',
    description: 'Character finalization',
    execute(message, args)
    {
        //DB INIT
        var Datastore = require('nedb');
        db = {};
        db.users = new Datastore({ filename: './interlock-users.db', autoload: true });
        db.stats = new Datastore({ filename: './interlock-stats.db', autoload: true });
        db.skills = new Datastore({ filename: './interlock-skills.db', autoload: true });
        db.freeskills = new Datastore({ filename: './interlock-freeskills.db', autoload: true });

        //STATS LIST
        stats = ['Intelligenza', 'Freddezza', 'Empatia', 'Tecnologia', 'Riflessi', 'Costituzione', 'Fascino'];
        var stat_toString = stats.join(', '); //to string

        //check if stats exists
        db.stats.find({userid: message.author.id}, (err, character) => 
        {
            let list_stats = []; //stats in storage
            let rank_sum = []; //rank in storage

            for(i = 0; i < character.length; i++)
            {
                rank_sum[i] = parseInt(character[i]['rank']);
                list_stats[i] = character[i]['stat'];
            }

            var r_sum = rank_sum.join(', '); //to list
            var l_stats = list_stats.join(', '); //to list

            if(list_stats.length === stats.length) //if len array stats stor. == array stats
            {
                if(rank_sum.reduce((a, b) => a + b, 0) == 45)
                {
                    let proof_rank = [];
                    let proof_list = [];

                    db.skills.find({userid: message.author.id}, (err, char) => //check professional skills
                    {
                        for(i = 0; i < char.length; i++)
                        {
                            proof_rank[i] = parseInt(char[i]['rank']);
                            proof_list[i] = char[i]['skill'];
                        }

                        proof_listoStr = proof_list.join(', '); //list skill in db
                        proof_ranktoStr = proof_rank.join(', '); //list rank in db

                        if(proof_rank.reduce((a, b) => a + b, 0) == 40) //if rank is 40
                        {
                            db.freeskills.find({userid: message.author.id}, (err, chr) => //freeskill
                            {
                                let fs_rank = [];
                                let fs_list = []; 

                                for(i = 0; i < chr.length; i++)
                                {
                                    fs_rank[i] = parseInt(chr[i]['rank']);
                                    fs_list[i] = chr[i]['skill'];
                                }

                                fs_ranktoStr = fs_rank.join(', '); //list freeskill in db
                                fs_listoStr = fs_list.join(', '); //list rank in db

                                if(fs_rank.reduce((a, b) => a + b, 0) == 12) //total rank freeskill 12
                                {
                                    db.users.update({userid: message.author.id}, {$set: {end: true}}, {}, (err, replc) => 
                                    {
                                        if(replc == 1)
                                        {
                                            //finaliz.
                                            message.channel.send(`Finalizzazione del personaggio completata. Ben fatto Choomba! Per giocare digita **!roll** seguito da una statistica, oppure da una statistica e un'abilità. Esempio: ***!roll freddezza*** oppure ***!roll riflessi pistole***`);
                                        }
                                    });
                                }
                                else
                                {
                                    //if rank freeskill not 12
                                    message.channel.send(`La somma dei punti spesi nelle skills non professionali non è corretta. Deve essere 12. Attualmente hai scelto ***${fs_listoStr}*** e hai assegnato rispettivamente ***${fs_ranktoStr}***. Digita **!freeskill** per aggiornare e modificare le abilità non professionali`);
                                }
                            });
                        }
                        else
                        {
                            //proof skill not 40.
                            message.channel.send(`La somma dei punti spesi nelle **skills professionali** non è corretta, deve essere 40. Attualmente hai scelto ***${proof_listoStr}*** e hai assegnato rispettivamente ***${proof_ranktoStr}*** punti. Col comando *!skill* puoi aggiornare e modificare quelle inserite`);
                        }
                    });
                }
                else
                {
                    //rank not 45
                    message.channel.send(`La somma dei punti spesi non è corretta, deve raggiungere 45. Dai un valore da 3 a 10 a tutte queste abilità ${stat_toString}. Puoi aggiornare quelle già inserite. Attualmente hai inserito queste abilità ***${l_stats}*** con rispettivi punteggi **${r_sum}**. Es.: !stat Freddezza 4.`);
                }
            }
            else
            {
                //missing stats
                message.channel.send(`Il numero delle statistiche non è corretto. Dai un valore da 3 a 10 a tutte queste abilità ${stat_toString}. Puoi aggiornare quelle già inserite. Attualmente hai inserito queste abilità ***${l_stats}*** con rispettivi punteggi **${r_sum}**. Il totale dei punti spesi deve essere 45. Es.: !stat Freddezza 4.`);
            }
        });
    }
}