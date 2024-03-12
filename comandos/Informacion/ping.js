const Discord= require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Sirve para ver la latencia de radio'),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: `❌ | No tienes permisos para ejecutar el comando \`/ping\`.`, ephemeral: true });
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        sent.edit({content: `🕑 | El ping del bot es de: \`${sent.createdTimestamp - interaction.createdTimestamp}ms\``});
    }
}