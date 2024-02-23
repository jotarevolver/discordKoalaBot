const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const keep_alive = require('./keep_alive.js')

const client = new Client({ intents: 3276799 });

client.on('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  // Verifica que el mensaje provenga de un servidor (guild) y no sea del bot
  if (message.guild && !message.author.bot) {
    // Expresión regular para encontrar enlaces de x.com
    const xLinkRegex = /https:\/\/x\.com\/.*/;

    // Busca enlaces de x.com en el mensaje
    const xLinks = message.content.match(xLinkRegex);

    // Si se encuentran enlaces, modifícalos y responde
    if (xLinks && xLinks.length > 0) {
      const modifiedLinks = xLinks.map(link => link.replace('https://x.com/', 'https://fxtwitter.com/'));

      // Menciona al autor original y envía el enlace modificado
      await message.channel.send(`${message.author.toString()}, envió:\n${modifiedLinks.join('\n')}`);

      // Borra el mensaje original
      await message.delete();
    }
  }
});

client.on('messageCreate', async (mensaje) => {
  if (mensaje.guild && !mensaje.author.bot) {
    const instagramLinkRegex = /https:\/\/www\.instagram\.com\/.*/;

    const igLink = mensaje.content.match(instagramLinkRegex);

    if (igLink && igLink.length > 0) {
      const igLinkModificado = igLink.map(link => link.replace('https://www.instagram.com/', 'https://www.ddinstagram.com/'));

      await mensaje.channel.send(`${mensaje.author.toString()}, envió:\n${igLinkModificado.join('\n')}`);

      await mensaje.delete();
    }
  }
})

// Asegúrate de mantener tu token seguro
client.login(process.env.TOKEN);
