const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiscordAPIError } = require('discord.js');

module.exports = {
    // Creamos el comando '/imagenbotkoalaarmy' y le asignamos un nombre su descripcion y una opcion para Attachment que sea si o si requerida
    data: new SlashCommandBuilder()
        .setName('imagenbotkoalaarmy')
        .setDescription('Elige una imagen para el Bot de la Koala Army')
        .addAttachmentOption(option => option
            .setName('imagen')
            .setDescription('Sube una imagen al bot')
            .setRequired(true)
        ),
    // Aca comienza a ejecutarse, utilizamos try para que lo intente ejecutar y si aparece un error lo atrape y se muestre en la consola para
    // que no crashee el bot. Ya que el bot hay que encenderlo manualmente.
    run: async (client, interaction) => {
        try {
            if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: `❌ | No tienes permisos suficientes para ejecutar el comando \`/imagenbotkoalaarmy\`.`, ephemeral: true });
            const avatar = interaction.options.getAttachment('imagen');
            await client.user.setAvatar(avatar.url);
            await interaction.reply({ content: 'La imagen ha sido cargada con éxito.' });
        } catch (error) { // El catch atrapa el error y lo muestra en consola si tuvo un problema al ejecutar el comando, pero
            // si el error que salta no es por el comando en si, tenemos que manejarlo desde la API de Discord y que lo muestre en consola
            // para que no crashee. Ya que este comando es para poder ponerle gifs al bot sin nitro, por ende puede crashear facilmente
            // aunque los coloca de igual forma.
            console.error('Error al ejecutar el comando "setimage":', error);
            if (error instanceof DiscordAPIError) {
                // Si es una interacción desconocida, no respondemos nada
                console.log('Interacción desconocida. No se pudo responder.');
                return;
            }
            // Otros errores
            await interaction.reply({ content: 'Hubo un error al ejecutar el comando.' });
        }
    },
};
