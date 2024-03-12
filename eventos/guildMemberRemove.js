const Discord = require("discord.js");

module.exports = {
    name: 'guildMemberRemove',
    async run(member) {
        // Verificar si el miembro está asociado con un servidor
        if (!member.guild) {
            console.log("El evento guildMemberAdd se disparó fuera del contexto del servidor.");
            return;
        }

        const name = member.user.username;
        const id = member.user.id;
        const guild = member.guild;

        const removeChannel = guild.channels.cache.find(channel => channel.name === 'general');
        if (!removeChannel) {
            console.log("No se encontró el canal general.");
            return;
        }

        const embed = {
            color: 0xFF0000,
            title: `Nos vemos negro de mierda basura escoria cagada humana llamada: ${name}`,
            thumbnail: { url: member.user.displayAvatarURL() },
            fields: [
                { name: 'Fetiche', value: `\`Culo peludo\``, inline: true },
                { name: 'Sexo', value: `\`Por el culo peludo\``, inline: true }
            ],
            image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXo0YTIzbHF4MmJmYnBwdWRnYjl5Z2F2NTR5cmZiajRtYnZlamRlNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6Zt0mmqikyxcU0Q8/giphy.gif' }
        }

        await removeChannel.send({ embeds: [embed] });
    },
};
