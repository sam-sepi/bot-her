
module.exports =
{
    name: 'roll',
    description: 'Interlock d10 dice roll',
    execute(message, args)
    {
        var Datastore = require('nedb');
        db = {};
        db.users = new Datastore({ filename: './interlock-users.db', autoload: true });
        db.stats = new Datastore({ filename: './interlock-stats.db', autoload: true });
        db.skills = new Datastore({ filename: './interlock-skills.db', autoload: true });
        db.freeskills = new Datastore({ filename: './interlock-freeskills.db', autoload: true });

        stats = ['intelligenza', 'freddezza', 'empatia', 'tecnologia', 'riflessi', 'costituzione', 'fascino'];
        
        var stat_toString = stats.join(', ');

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

        var skill_toStr = skills.join(', ');

        db.users.findOne({userid: message.author.id}, (err, character) => 
        {
            dice = Math.floor((Math.random() * 10) + 1);

            if(character.end == false)
            {
                message.channel.send(`Devi prima concludere la creazione del tuo personaggio. Digita **!end**`);
            }
            else
            {
                if(args[0])
                {
                    args[0] = args[0].toLowerCase();
                    
                    if(stats.includes(args[0]))
                    {
                        db.stats.findOne({userid: message.author.id, stat: args[0]}, (err, stat) => 
                        {
                            if(args[1])
                            {
                                args[1] = args[1].toLowerCase();

                                if(skills.includes(args[1]))
                                {
                                    db.skills.findOne({userid: message.author.id, skill: args[1]}, (err, skill) => 
                                    {
                                        if(skill == null)
                                        {
                                            db.freeskills.findOne({userid: message.author.id, skill: args[1]}, (err, skill) => 
                                            {
                                                if(skill == null)
                                                {
                                                    let tot = dice + parseInt(stat.rank) + 0;
                                                    message.channel.send(`Il risultato della prova ${args[1]} è (1d10)${dice} + (${args[0]})${stat.rank} + (${args[1]})0 = ${tot}`);
                                                }
                                                else
                                                {
                                                    let tot = dice + parseInt(stat.rank) + parseInt(skill.rank);
                                                    message.channel.send(`Il risultato della prova ${args[1]} è (1d10)${dice} + (${args[0]})${stat.rank} + (${args[1]})${skill.rank} = ${tot}`);
                                                }
                                            });
                                        }
                                        else
                                        {
                                            let tot = dice + parseInt(stat.rank) + parseInt(skill.rank);
                                            message.channel.send(`Il risultato della prova ${args[1]} è (1d10)${dice} + (${args[0]})${stat.rank} + (${args[1]})${skill.rank} = ${tot}`);
                                        }
                                    });
                                }
                                else
                                {
                                    message.channel.send(`Puoi ottenere un risultato per la tua azione solo se il secondo argomento è un statistica scelta tra *${!skill_toStr}*. Esempio: **!roll intelligenza rete**`);
                                }
                            }
                            else
                            {
                                let tot = dice + parseInt(stat.rank);
                                message.channel.send(`Il risultato della prova ${args[0]} è è (1d10)${dice} + (${args[0]})${stat.rank} = ${tot}`);
                            }
                        });
                    }
                    else
                    {

                    }
                }
                else
                {
                    message.channel.send(`Puoi ottenere un risultato per la tua azione solo se il primo argomento è un statistica scelta tra *${stat_toString}*. Esempio: **!roll intelligenza**`);
                }
            }
        });

    }
}