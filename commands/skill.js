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
                    var to_str = classes[ch].join(', ');

                    if(classes[ch].includes(args[0]))
                    {
                        if(isNaN(args[1]))
                        {
                            message.channel.send(`Per registrare la skill ${args[0]} devi far seguire un numero. !skill Rissa 4`);
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
                                            message.channel.send(`Abilità ${args[0]} inserita.`);

                                        });
                                    }
                                    else
                                    {
                                        db.skills.update({userid: message.author.id, skill: args[0]}, {$set: {rank: args[1]}}, {}, (err, numReplaced) => 
                                        {
                                            console.log(numReplaced);
                                            message.channel.send(`Abilità ${args[0]} aggiornata.`);
                                        });
                                    }
                                });  
                            }
                            else
                            {
                                message.channel.send(`L'abilità ${args[0]} deve essere compresa tra 1 e 10`);
                            }
                        }
                    }
                    else
                    {
                        message.channel.send(`La lista delle abilità della classe *${character.role}* è *${to_str}*. Il comando per registrare le skills è **!skill Abilità *(prima lettera maiuscola)* grado**. Puoi sceglierne sono alcune tra esse. Il grado deve essere compreso tra 1 e 10. Ex: !skill Rissa 4`);
                    }
                }
            });
        }
        else
        {
            db.users.findOne({ userid: message.author.id}, (err, character) =>
            {
                var roles_toString = roles.join(', ');

                if(character.role == null)
                {
                    message.channel.send(`Prima devi selezionare il tuo ruolo. Scegli tra ${roles_toString}`);
                }
                else
                {
                    var ch = character.role.toLowerCase();
                    var to_str = classes[ch].join(', ');
                    message.channel.send(`La lista delle abilità della classe *${character.role}* è *${to_str}*. Il comando per registrare le skills è **!skill Abilità *(prima lettera maiuscola)* grado**. Puoi sceglierne sono alcune tra esse. Il grado deve essere compreso tra 1 e 10. Ex: !skill Rissa 4`);
                }
            });    
        }
    }
}