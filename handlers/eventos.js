const fs = require('fs');
const eventosDir = `${process.cwd()}/eventos`;

module.exports = client => {
    const eventos = fs.readdirSync(eventosDir).filter(archivo => archivo.endsWith('.js'));
    for (const archivo of eventos) {
        const evento = require(`${eventosDir}/${archivo}`);
        if (evento.name === 'guildMemberAdd') {
            client.on(evento.name, async member => {
                // Verificar si el miembro está asociado con un servidor
                if (!member.guild) {
                    console.log("El evento guildMemberAdd se disparó fuera del contexto del servidor.");
                    return;
                }
                // Ejecutar la función del evento
                try {
                    await evento.run(member);
                } catch (error) {
                    console.error(`Error al ejecutar el evento guildMemberAdd: ${error}`);
                }
            });
        } if (evento.name === 'guildMemberRemove') {
            client.on(evento.name, async member => {
                // Verificar si el miembro está asociado con un servidor
                if (!member.guild) {
                    console.log("El evento guildMemberRemove se disparó fuera del contexto del servidor.");
                    return;
                }
                // Ejecutar la función del evento
                try {
                    await evento.run(member);
                } catch (error) {
                    console.error(`Error al ejecutar el evento guildMemberRemove: ${error}`);
                }
            }); 
        } else {
            client.on(evento.name, (...args) => evento.run(client, ...args));
        }
        console.log(`✅ | Evento ${archivo.replace(/.js/, '')} cargado`.yellow);
    }
};