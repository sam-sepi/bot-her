
module.exports = 
{
    name: 'character',
    description: 'Character creation',
    execute(message, args)
    {
        //DB init
        var Datastore = require('nedb'), db = new Datastore({ filename: './interlock-setup.db', autoload: true });
        
        db.findOne({id: 'Interlock'}, (err, rpgsystem) => {
            
            if(args[0] == 'help')
            {
                message.author.send(rpgsystem.help);
            }
        });
    }
}