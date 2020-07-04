module.exports = 
{
    name: 'skill',
    description: 'Skill Select',
    execute(message, args)
    {
        var Datastore = require('nedb');

        db = {};
        db.skills = new Datastore({ filename: './interlock-skills.db', autoload: true });
        db.users = new Datastore({ filename: './interlock-users.db', autoload: true });

        roles = ['rocker', 'solitario', 'netrunner', 'tecnico', 'reporter', 'poliziotto', 'corporativo', 'ricettatore', 'nomade'];

        classes = {};

        classes.rocker = ['leadership', 'suonare', 'sprawl', 'percepire', 'stile', 'comporre', 'raggirare', 'sedurre'];
        classes.solitario = ['mischia', 'atletica', 'percepire', 'fucili', 'furtività', 'rissa', 'forza', 'pistole'];
        classes.netrunner = ['interfaccia', 'programmare', 'rete', 'accademiche', 'scienze', 'elettronica', 'percepire', 'furtività'];
        classes.tecnico = ['riparare', 'cybertecnologia', 'scienze', 'elettronica', 'guarire', 'intuire', 'diagnosi', 'percepire'];
        classes.reporter = ['sprawl', 'intervistare', 'mondanità', 'credibilità', 'intuire', 'percepire', 'raggirare', 'comporre'];
        classes.poliziotto = ['autorità', 'mischia', 'sprawl', 'interrogare', 'rissa', 'intuire', 'pistole', 'atletica'];
        classes.corporativo = ['risorse', 'trucco', 'percepire', 'intuire', 'persuadere', 'raggirare', 'finanza', 'stile'];
        classes.ricettatore = ['contatti', 'mischia', 'falsificare', 'intimidire', 'rissa', 'raggirare', 'persuadere', 'scassinare'];
        classes.nomade = ['famiglia', 'guidare', 'atletica', 'percepire', 'fucili', 'resistenza', 'riparare', 'mischia'];

        var roles_toString = roles.join(', ');

        db.users.findOne({ userid: message.author.id}, (err, character) =>
        {
            if(character.role == null)
            {
                message.channel.send(`Prima di tutto devi selezionare il tuo ruolo. Scegli tra ${roles_toString}`);
            }
            else
            {
                var role = character.role;
                var to_str = classes[role].join(', ');

                if(args[0])
                {
                    args[0] = args[0].toLowerCase();

                    if(classes[role].includes(args[0]))
                    {
                        if(isNaN(args[1]))
                        {
                            message.channel.send(`Per registrare la skill professionale ${args[0]} devi far seguire un numero. !skill rissa 4`);
                        }
                        else
                        {
                            if(args[1] < 11 && args[1] > 0)
                            {
                                skill = 
                                {
                                    userid: message.author.id,
                                    name: character.name,
                                    skill: args[0],
                                    rank: args[1]
                                };

                                db.skills.findOne({userid: message.author.id, skill: args[0]}, (err, character) => 
                                {
                                    if(character == null)
                                    {
                                        db.skills.insert(skill, (err, newCharacter) => 
                                        {
                                            console.log(err);
                                            message.channel.send(`Abilità ${args[0]} inserita. Una volta utilizzati i 40 punti digita **!freeskill**`);

                                        });
                                    }
                                    else
                                    {
                                        db.skills.update({userid: message.author.id, skill: args[0]}, {$set: {rank: args[1]}}, {}, (err, numReplaced) => 
                                        {
                                            console.log(numReplaced);
                                            message.channel.send(`Abilità ${args[0]} aggiornata. Una volta utilizzati i 40 punti digita **!freeskill**`);
                                        });
                                    }
                                });  
                            }
                            else
                            {
                                message.channel.send(`L'abilità professionale ${args[0]} deve essere compresa tra 1 e 10`);
                            }
                        }
                    }
                }
                else
                {
                    message.channel.send(`Hai **40** punti da distribuire in abilità professionali. La lista delle abilità professionali della classe *${character.role}* è *${to_str}*. Il comando per registrare le skills è **!skill abilità grado**. Puoi sceglierne anche solo alcune tra esse. Il grado deve essere compreso tra 1 e 10. *Esempio*: **!skill rissa 4**`);
                }
            }
        });
    }
}