const Discord = require("discord.js");

module.exports = {
    name: 'guildMemberAdd',
    async run(member) {
        // Verificar si el miembro está asociado con un servidor
        if (!member.guild) {
            console.log("El evento guildMemberAdd se disparó fuera del contexto del servidor.");
            return;
        }

        const name = member.user.username;
        const guild = member.guild;
        const welcomeChannel = guild.channels.cache.find(channel => channel.name === 'general');
        
        if (!welcomeChannel) {
            console.log("No se encontró el canal general.");
            return;
        }

        const embed = {
            color: 0xEE82EE,
            title: `Bienvenido/a ${name}`,
            thumbnail: { url: member.user.displayAvatarURL() },
            fields: [
                { name: 'Nombre de usuario', value: `\`${name}\``, inline: true },
                { name: 'Sexo', value: `\`Por el culo mejor\``, inline: true }
            ],
            image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXo3YWMxN2h6azBuaTJvY3YxcWs3YTl4djdrNHg3MHd3d2ZoYnJxNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2SpQYnBflAq7aXMk/giphy.gif' }
        }

        // Obtener invitaciones del servidor después de enviar el mensaje de bienvenida
        const invites = await guild.invites.fetch();

        // Buscar la invitación utilizada para invitar al nuevo miembro
        const inviteUsed = invites.find(invite => invite.uses > 0);

        // Agregar el footer con el nombre del inviter si se encuentra una invitación válida
        if (inviteUsed) {
            embed.footer = { text: `🐨 Invitado por: ${inviteUsed.inviter.username}` };
        } else {
            embed.footer = { text: 'Invitado por: ❌ No disponible' };
        }

        // Enviar el mensaje de bienvenida con el footer adecuado
        await welcomeChannel.send({ embeds: [embed] });
    },
};
