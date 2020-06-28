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

        if(args[0])
        {
            sk = args[0].toLowerCase();

            db.users.findOne({ userid: message.author.id}, (err, character) =>
            {
                help = {};
                var roles_toString = roles.join(', ');

                if(character.role == null)
                {
                    message.channel.send(`Prima devi selezionare il tuo ruolo. Scegli tra ${roles_toString}`);
                }
                else
                {
                    var ch = character.role.toLowerCase();
                    var to_str = classes[ch].join(', ');

                    help.err = `La lista delle abilità della classe *${character.role}* è *${to_str}*. Il comando per registrare le skills è **!skill Abilità *(prima lettera maiuscola)* grado**. Ex: !skill Rissa 4`;

                    if(classes[ch].includes(args[0]))
                    {
                        if(isNaN(args[1]))
                        {
                            help.nan = `Per registrare la skill ${args[0]} devi far seguire un numero. !skill Rissa 4`;
                            message.channel.send(help.nan);
                        }
                        else
                        {
                            skill = 
                            {
                                userid: message.author.id,
                                name: character.name,
                                skill: args[0],
                                rank: args[1]
                            };

                            db.skills.insert(skill, (err, newCharacter) => 
                            {
                                console.log(err);
                            });
                
                        }
                    }
                    else
                    {
                        message.channel.send(help.err);
                    }
                }
            });
        }
    }
}