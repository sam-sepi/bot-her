module.exports = 
{
    name: 'freeskill',
    description: 'Free skill Select',
    execute(message, args)
    {
        var Datastore = require('nedb');

        db = {};
        db.freeskills = new Datastore({ filename: './interlock-freeskills.db', autoload: true });
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

        //skills
        skills = [
            'accademiche', 'scienze', 'percepire', 'pedinare', 'seminare', 'rete', 'finanza', 'programmare', 'sopravvivenza', 'comporre',
            'intimidire', 'volontà', 'interrogare', 'sprawl',
            'intervistare', 'mondanità', 'intuire', 'persuadere', 'raggirare', 'sedurre',
            'borseggiare', 'esplosivi', 'falsificare', 'riparare', 'scassinare', 'soverglianza', 'suonare', 'elettronica', 'guarire', 'diagnosi', 'cybertecnologia',
            'mischia', 'pistole', 'fucili', 'mitra', 'rissa', 'danza', 'furtività', 'guidare', 'pilotare', 'schivare',
            'forza', 'nuotare', 'resistenza', 'atletica',
            'stile', 'trucco'
        ];

        function arr_diff (a1, a2) {

            var a = [], diff = [];
        
            for (var i = 0; i < a1.length; i++) {
                a[a1[i]] = true;
            }
        
            for (var i = 0; i < a2.length; i++) {
                if (a[a2[i]]) {
                    delete a[a2[i]];
                } else {
                    a[a2[i]] = true;
                }
            }
        
            for (var k in a) {
                diff.push(k);
            }
        
            return diff;
        }

        var roles_toString = roles.join(', ');

        db.users.findOne({ userid: message.author.id}, (err, character) =>
        {
            if(character.role == null)
            {
                message.channel.send(`Prima devi selezionare il tuo ruolo. Scegli tra **${roles_toString}**`);
            }
            else
            {
                var role = character.role;

                freeskills = [];
                freeskills = arr_diff(classes[role], skills);
                var frees_toS = freeskills.join(', ');

                if(args[0])
                {
                    if(freeskills.includes(args[0]))
                    {
                        if(isNaN(args[1]))
                        {
                            message.channel.send(`Per registrare la skill professionale ${args[0]} devi far seguire un numero. *Esempio:* **!skill rissa 4**`);
                        }
                        else
                        {
                            db.freeskills.findOne({userid: message.author.id, skill: args[0]}, (err, chr) => 
                            {
                                if(args[1] < 11 && args[1] > 0)
                                {
                                    freeskill = 
                                    {
                                        userid: message.author.id,
                                        name: character.name,
                                        skill: args[0],
                                        rank: args[1]
                                    };

                                    if(chr == null)
                                    {
                                        db.freeskills.insert(freeskill, (err, newCharacter) => 
                                        {
                                            console.log(err);
                                            message.channel.send(`Abilità ${args[0]} inserita.`);

                                        });
                                    }
                                    else
                                    {
                                        db.freeskills.update({userid: message.author.id, skill: args[0]}, {$set: {rank: args[1]}}, {}, (err, numReplaced) => 
                                        {
                                            console.log(numReplaced);
                                            message.channel.send(`Abilità ${args[0]} aggiornata.`);
                                        });
                                    }
                                }
                                else
                                {
                                    message.channel.send(`L'abilità non professionale ${args[0]} deve essere compresa tra 1 e 10`);
                                }
                            }); 
                        }
                    }
                    else
                    {
                        message.channel.send(`Hai **12** punti da dividere in abilità non professionali. Scegli tra *${frees_toS}*. **Attento alla miuscola choomba** Es.: **!freeskill rissa 4**`);
                    }
                }
                else
                {
                    message.channel.send(`Hai **12** punti da dividere in abilità non professionali. Scegli tra *${frees_toS}*. Es.: **!freeskill rissa 4**`);
                }
            }    
        });
    }
}