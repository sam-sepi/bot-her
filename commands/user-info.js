
module.exports =
{
    name: 'user-info',
    description: 'User info',
    execute(message, args)
    {
        if(!args.length) 
        {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
        }
        else
        {
            const taggedUser = message.mentions.users.first();

            const idList = message.mentions.users.map(user => {
                return `ID ${user.username}  ${user.id}`;
            });

            message.channel.send(idList);
        }
    }
}