module.exports = {
    name: 'ban',
    description:  "This command bans a member!",
    execute(message, args){
        const member = message.mentions.users.first();
        if(member){
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.ban();
            message.channel.send("user has been banned")
        }else{
            message.channel.send('you couldnt ban a member');

        }
    }

}