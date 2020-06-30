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

        roles = ['Rocker', 'Solitario', 'Netrunner', 'Tecnico', 'Reporter', 'Poliziotto', 'Corporativo', 'Ricettatore', 'Nomade'];

        classes = {};

        classes.rocker = ['Leadership', 'Suonare', 'Sprawl', 'Percepire', 'Stile', 'Comporre', 'Raggirare', 'Sedurre'];
        classes.solitario = ['Mischia', 'Atletica', 'Percepire', 'Fucili', 'Furtività', 'Rissa', 'Forza', 'Pistole'];
        classes.netrunner = ['Interfaccia', 'Programmare', 'Rete', 'Accademiche', 'Scienze', 'Elettronica', 'Percepire', 'Furtività'];
        classes.tecnico = ['Riparare', 'Cybertecnologia', 'Scienze', 'Elettronica', 'Guarire', 'Intuire', 'Diagnosi', 'Percepire'];
        classes.reporter = ['Sprawl', 'Intervistare', 'Mondanità', 'Credibilità', 'Intuire', 'Percepire', 'Raggirare', 'Comporre'];
        classes.poliziotto = ['Autorità', 'Mischia', 'Sprawl', 'Interrogare', 'Rissa', 'Intuire', 'Pistole', 'Atletica'];
        classes.corporativo = ['Risorse', 'Trucco', 'Percepire', 'Intuire', 'Persuadere', 'Raggirare', 'Finanza', 'Stile'];
        classes.ricettatore = ['Contatti', 'Mischia', 'Falsificare', 'Intimidire', 'Rissa', 'Raggirare', 'Persuadere', 'Scassinare'];
        classes.nomade = ['Famiglia', 'Guidare', 'Atletica', 'Percepire', 'Fucili', 'Resistenza', 'Riparare', 'Mischia'];

        //skills
        skills = [
            'Accademiche', 'Scienze', 'Percepire', 'Pedinare', 'Seminare', 'Rete', 'Finanza', 'Programmare', 'Sopravvivenza', 'Comporre',
            'Intimidire', 'Volontà', 'Interrogare', 'Sprawl',
            'Intervistare', 'Mondanità', 'Intuire', 'Persuadere', 'Raggirare', 'Sedurre',
            'Borseggiare', 'Esplosivi', 'Falsificare', 'Riparare', 'Scassinare', 'Soverglianza', 'Suonare', 'Elettronica', 'Guarire', 'Diagnosi',
            'Mischia', 'Pistole', 'Fucili', 'Mitra', 'Rissa', 'Danza', 'Furtività', 'Guidare', 'Pilotare', 'Schivare',
            'Forza', 'Nuotare', 'Resistenza', 'Atletica',
            'Stile', 'Trucco'
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
                    var ch = character.role.toLowerCase();

                    freeskills = [];
                    freeskills = arr_diff(classes[ch], skills);

                    var frees_toS = freeskills.join(', ');

                    if(freeskills.includes(args[0]))
                    {
                        if(isNaN(args[1]))
                        {
                            message.channel.send(`Per registrare la skill professionale ${args[0]} devi far seguire un numero. !skill Rissa 4`);
                        }
                        else
                        {
                            freeskill = 
                            {
                                userid: message.author.id,
                                name: character.name,
                                skill: args[0],
                                rank: args[1]
                            };

                            db.freeskills.findOne({userid: message.author.id, skill: args[0]}, (err, chr) => 
                            {
                                if(args[1] < 11 && args[1] > 0)
                                {
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
                        var frees_toS = freeskills.join(', ');
                        message.channel.send(`Hai 12 punti da dividere in abilità non professionali. Scegli tra ${frees_toS}. **Attento alla miuscola choomba** Es.: !freeskill Rissa 4`);
                    }

                }
            });
        }
        else
        {
            db.users.findOne({ userid: message.author.id}, (err, character) =>
            {
                if(character.role == null)
                {
                    message.channel.send(`Prima devi selezionare il tuo ruolo. Scegli tra ${roles_toString}`);
                }
                else
                {
                    var ch = character.role.toLowerCase();

                    freeskills = [];
                    freeskills = arr_diff(classes[ch], skills);

                    var frees_toS = freeskills.join(', ');

                    message.channel.send(`Hai 12 punti da dividere in abilità non professionali. Scegli tra ${frees_toS}. **Attento alla miuscola choomba** Es.: !freeskill Rissa 4`);
                }     
            });   
        }
    }
}