module.exports =
{
    name: 'scheda',
    description: 'Visualizzazione della scheda via dm',
    execute(message, args)
    {
        if(args[0])
        {
             //DB INIT
            var Datastore = require('nedb');
            db = {};
            db.users = new Datastore({ filename: './interlock-users.db', autoload: true });

            //check if already exists
            db.users.findOne({name: args[0]}, (err, character) =>
            {
                roleID = '766948721035837460';

                if(!character)
                {
                    message.channel.send(`Non esiste un pg associato al nome`); return;
                }
                else if((message.author.id === character.userid) || message.member.roles.cache.has(roleID))
                {
                    db.stats = new Datastore({ filename: './interlock-stats.db', autoload: true });
                    db.skills = new Datastore({ filename: './interlock-skills.db', autoload: true });
                    db.freeskills = new Datastore({ filename: './interlock-freeskills.db', autoload: true });

                    db.stats.find({name: args[0]}, (err, stat) => 
                    {
                        let list_stats = []; //stats in storage
                        let rank_sum = []; //rank in storage

                        for(i = 0; i < stat.length; i++)
                        {
                            rank_sum[i] = parseInt(stat[i]['rank']);
                            list_stats[i] = stat[i]['stat'];
                        }

                        var r_sum = rank_sum.join(', '); //to list
                        var l_stats = list_stats.join(', '); //to list

                        db.skills.find({name: args[0]}, (err, skills) => 
                        {
                            let proof_rank = [];
                            let proof_list = [];

                            for(i = 0; i < skills.length; i++)
                            {
                                proof_rank[i] = parseInt(skills[i]['rank']);
                                proof_list[i] = skills[i]['skill'];
                            }

                            proof_listoStr = proof_list.join(', '); //list skill in db
                            proof_ranktoStr = proof_rank.join(', '); //list rank in db

                            db.freeskills.find({name: args[0]}, (err, freeskills) => 
                            {
                                let fs_rank = [];
                                let fs_list = [];

                                for(i = 0; i < freeskills.length; i++)
                                {
                                    fs_rank[i] = parseInt(freeskills[i]['rank']);
                                    fs_list[i] = freeskills[i]['skill'];
                                }

                                fs_ranktoStr = fs_rank.join(', '); //list freeskill in db
                                fs_listoStr = fs_list.join(', '); //list rank in db

                                message.author.send(`Scheda di ***${args[0]}***. Statistiche ***${l_stats}*** e gradi rispettivi ${r_sum}`);
                                message.author.send(`Skills professionali ***${proof_listoStr}*** e gradi rispettivi ${proof_ranktoStr}`);
                                message.author.send(`Skills non professionali professionali ***${fs_listoStr}*** e gradi rispettivi ${fs_ranktoStr}`);
                            });
                        });
                    });
                }
                else
                {
                    message.channel.send(`https://tenor.com/view/shannon-sharpe-shay-nope-nah-nuhuh-gif-12298561`);
                    //message.channel.send(`Non possiedi i permessi per vedere la scheda di ***${args[0]}***`);
                }
            });
        }
    }
}