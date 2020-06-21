
module.exports = 
{
    name: 'character',
    description: 'Character creation',
    execute(message, args)
    {
        //DB
        var Datastore = require('nedb');
        let db = {};
        //db.users = new Datastore({ filename: './users.db', autoload: true });
        db.system = new Datastore({ filename: './system-setup.db', autoload: true });
    
        let character = {};

        if(args[0] == 'name') 
        {
            if(args[1].length < 20)
            {
                character.name = args[1];
            }
            else 
            {
                message.channel.send('Scegli un nome più breve per il tuo personaggio');
            }
        }
        else
        {
            db.system.findOne({ id: 'Interlock' }, function (err, docs) 
            {
                //arg[0] in skills or stat
                if(!docs.stat.includes(args[0]) || (!docs.skills.includes(args[0])))
                {
                    message.channel.send(`La sintassi per la creazione del personaggio è !character stat o skill e grado. Le statistiche sono ${docs.stat.toString()} e le skill ${docs.skill.toString()}`);
                }

                //arg[1]
                if(!isNaN(args[1]))
                {
                    message.channel.send('La sintassi per la creazione del personaggio è !character stat o skill e grado');
                }
                else if(docs.min > args[1] > docs.max)
                {
                    message.channel.send(`Il valore minimo delle caratteristiche è ${docs.min} ed il massimo ${docs.max}`);
                }

            });
        }
    }
}