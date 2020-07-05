module.exports = 
{
    name: 'freeskill',
    description: 'Free skill Select',
    execute(message, args)
    {
        //DB INIT
        var Datastore = require('nedb');

        db = {};
        db.freeskills = new Datastore({ filename: './interlock-freeskills.db', autoload: true });
        db.users = new Datastore({ filename: './interlock-users.db', autoload: true });

        //ROLES LIST
        roles = ['rocker', 'solitario', 'netrunner', 'tecnico', 'reporter', 'poliziotto', 'corporativo', 'ricettatore', 'nomade'];
        var roles_toString = roles.join(', ');

        //SKILL PROOF LIST
        classes = {};

        classes.rocker = ['leadership', 'suonare', 'sprawl', 'percepire', 'stile', 'comporre', 'raggirare', 'sedurre'];
        classes.solitario = ['mischia', 'atletica', 'percepire', 'fucili', 'furtività', 'rissa', 'combattimento', 'pistole'];
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
            'borseggiare', 'esplosivi', 'falsificare', 'riparare', 'scassinare', 'sorveglianza', 'suonare', 'elettronica', 'guarire', 'diagnosi', 'cybertecnologia',
            'mischia', 'pistole', 'fucili', 'mitra', 'rissa', 'danza', 'furtività', 'guidare', 'pilotare', 'schivare',
            'forza', 'nuotare', 'resistenza', 'atletica',
            'stile', 'trucco'
        ];

        //Unique SKILLS
        prof_skills = ['leadership', 'interfaccia', 'risorse', 'famiglia', 'autorità', 'riparare', 'credibilità', 'contatti', 'combattimento'];

        //Function for array diff
        function arr_diff (a1, a2, a3) {

            var a = [], diff = [];
        
            for (var i = 0; i < a1.length; i++) 
            {
                a[a1[i]] = true;
            }
        
            for (var i = 0; i < a2.length; i++) 
            {
                if(a[a2[i]]) 
                {
                    delete a[a2[i]];
                } 
                else 
                {
                    a[a2[i]] = true;
                }
            }
        
            for (var k in a) 
            {
                if(!a3.includes(k))
                {
                    diff.push(k);
                }
            }
        
            return diff;
        }

        //check if role exists
        db.users.findOne({ userid: message.author.id}, (err, character) =>
        {
            if(character.role == null)
            {
                //if not exists role in db
                message.channel.send(`Prima devi selezionare il tuo ruolo. Scegli tra **${roles_toString}**`);
            }
            else
            {   
                //role
                var role = character.role;

                freeskills = [];
                freeskills = arr_diff(skills, classes[role], prof_skills); //skills not professional

                var frees_toS = freeskills.join(', '); //to string

                if(args[0]) //if args after command
                {
                    if(freeskills.includes(args[0])) //if in array freeskills
                    {
                        if(isNaN(args[1])) //if not a int
                        {
                            message.channel.send(`Per registrare la skill professionale ${args[0]} devi far seguire un numero. *Esempio:* **!skill rissa 4**`);
                        }
                        else
                        {
                            //check if freeskill exists
                            db.freeskills.findOne({userid: message.author.id, skill: args[0]}, (err, chr) => 
                            {
                                if(args[1] < 11 && args[1] > 0) //in raange
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
                                        //insert skill
                                        db.freeskills.insert(freeskill, (err, newCharacter) => 
                                        {
                                            console.log(err);
                                            message.channel.send(`Abilità ${args[0]} inserita. Quando hai finito digita ***!end***`);

                                        });
                                    }
                                    else
                                    {
                                        //update skill
                                        db.freeskills.update({userid: message.author.id, skill: args[0]}, {$set: {rank: args[1]}}, {}, (err, numReplaced) => 
                                        {
                                            console.log(numReplaced);
                                            message.channel.send(`Abilità ${args[0]} aggiornata. Quando hai finito digita ***!end***`);
                                        });
                                    }
                                }
                                else
                                {
                                    //not in range
                                    message.channel.send(`L'abilità non professionale ${args[0]} deve essere compresa tra 1 e 10`);
                                }
                            }); 
                        }
                    }
                    else
                    {
                        //if arg error
                        message.channel.send(`Hai **12** punti da dividere in abilità non professionali. Scegli tra questa lista: ***${frees_toS}***. Es.: **!freeskill rissa 4**`);
                    }
                }
                else
                {
                    //not arg after command
                    message.channel.send(`Hai **12** punti da dividere in abilità non professionali. Scegli tra questa lista ***${frees_toS}***. Es.: **!freeskill rissa 4**`);
                }
            }    
        });
    }
}