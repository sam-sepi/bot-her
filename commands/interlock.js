
module.exports =
{
    name: 'interlock',
    description: 'Interlock d10 dice roll',
    execute(message, args)
    {
        skills = ['empatia'];

        const skill = args[0];

        let dice = Math.floor(Math.random()*10) + 1

        if(!args.length) 
        {
            message.channel.send('Interlock d10. Rolled: ' + dice);
        }
        else if(skill)
        {
            message.channel.send(`Interlock d10. Rolled ${skill}: ` + (dice + 5));
        }
        else
        {
            message.channel.send('Digitare !interlock oppure !interlock seguito dall\'abilità');
        }
    }
}