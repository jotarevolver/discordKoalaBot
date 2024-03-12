const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Muestra la foto de perfil')
        .addUserOption((option => option.setName(`usuario`).setDescription(`Menciona a un usuario`).setRequired(true))),
    run: async (client, interaction) => {
        const user = interaction.options.getUser('usuario');
        const embed = {
            color: 0xEE82EE,
            title: `Avatar de ${user.username}`,
            image: { url: user.displayAvatarURL({ dynamic: true, size: 4096 }) }
        };
        await interaction.reply({ embeds: [embed] });
    },
};
