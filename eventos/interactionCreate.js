module.exports = {
    name: 'interactionCreate',
    run: (client, interaction) => {
        const comando = client.comandos.get(interaction.commandName);
        if (comando) {
            comando.run(client, interaction);
        } else {
            interaction.reply({content: '❌ | El comando no existe'});
        }
    }
}