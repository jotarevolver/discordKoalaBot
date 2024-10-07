const Discord = require('discord.js');
const { Client } = require('discord.js');
const client = new Client({ intents: 3276799 }); 
const config = require('./config.json');
const keep_alive = require('./keep_alive.js');
const prefix = ".";
require('colors');

client.login(process.env.TOKEN);
client.color = config.color;

client.on('messageCreate', async (mensaje) => {
    if (mensaje.author.bot) return;
    if (!mensaje.content.startsWith(prefix)) return;
   
    const args = mensaje.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
   
    if (command === 'clear') {
      const cantidad = parseInt(args[0]);
   
      if (isNaN(cantidad) || cantidad <= 0 || cantidad > 50) {
        const replyMessage = await mensaje.reply('Por favor, proporciona un número válido de mensajes a borrar (máximo 50).');
        setTimeout(async () => {
          try {
            if (replyMessage.deletable && !replyMessage.deleted) {
              await replyMessage.delete();
            } else {
              console.log('Confirmation message was already deleted.'.green);
            }
          } catch (error) {
            console.log('Confirmation message was already deleted.'.red);
          }
        }, 5000);
      } else {
        try {
          const fetchedMessages = await mensaje.channel.messages.fetch({ limit: cantidad + 1 });
          const oldestMessage = fetchedMessages.last();
          const oldestMessageDate = oldestMessage.createdAt;
          const differenceInDays = Math.ceil((Date.now() - oldestMessageDate) / (1000 * 3600 * 24));
   
          if (differenceInDays > 14) {
            const mensajeAntiguedad = await mensaje.reply('No puedo borrar mensajes antiguos de más de 14 días.');
            setTimeout(() => mensajeAntiguedad.delete(), 2000);
   
            return;
          }
   
          mensaje.channel.bulkDelete(fetchedMessages)
            .then(async (messages) => {
              const mensajeaBorrar = await mensaje.channel.send(`Se ${(messages.size - 1 === 1) ? 'borró' : 'borraron'} ${messages.size - 1} ${(messages.size - 1 === 1) ? 'mensaje' : 'mensajes'}.`);
   
              setTimeout(async () => {
                try {
                  if (mensajeaBorrar.deletable) {
                    await mensajeaBorrar.delete();
                  } else {
                    console.log('Confirmation message was already deleted.'.green);
                  }
                } catch (error) {
                  console.log('Confirmation message was already deleted.'.red);
                }
              }, 5000);
            })
            .catch(error => {
              console.error('Error al borrar mensajes:'.red, error);
              mensaje.reply('Hubo un error al intentar borrar mensajes.');
            });
        } catch (error) {
          console.error('Error al borrar mensajes:'.red, error);
          mensaje.reply('Hubo un error al intentar borrar mensajes.');
        }
      }
    }
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
});

client.on('messageCreate', async (mensaje) => {
  if (mensaje.guild && !mensaje.author.bot) {
    const tktShortRegex = /https:\/\/vm\.tiktok\.com\/.*/; // Regex para el enlace corto de TikTok
    const tktShortLink = mensaje.content.match(tktShortRegex);

    const tktLongRegex = /https:\/\/www\.tiktok\.com\/.*/; 
    const tktLongLink = mensaje.content.match(tktLongRegex);



    if (tktShortLink && tktShortLink.length > 0) {

      const tktShortUrl = tktShortLink[0]; // Captura la primera coincidencia



        // Reemplaza la parte de la URL larga con el dominio deseado
        const tktShortFinal = tktShortUrl.replace('https://vm.tiktok.com/', 'https://vm.vxtiktok.com/');

        // Envía la URL final al canal y borra el mensaje original
        await mensaje.channel.send(`${mensaje.author.toString()}, envió:\n${tktShortFinal}`);
        await mensaje.delete();

    }


    if (tktLongLink && tktLongLink.length > 0) {
      const tktLongUrl = tktLongLink[0]; // Captura la primera coincidencia

      // Reemplaza la parte de la URL larga con el dominio deseado
      const tktLongFinal = tktLongUrl.replace('https://www.tiktok.com/', 'https://vxtiktok.com/');

        // Envía la URL final al canal y borra el mensaje original
        await mensaje.channel.send(`${mensaje.author.toString()}, envió:\n${tktLongFinal}`);
        await mensaje.delete();

    }
  }
});


client.on('messageCreate', async (mensaje) => {
  const mensajeUsuarioRegex = /https:\/\/vxtwitter\.com\/.*/ || /https:\/\/fxtwitter\.com\/.*/;
  
  if (mensajeUsuarioRegex) {
    const captureMessageByBot = mensaje.content.match(mensajeUsuarioRegex);
    const sendMessageByBot = captureMessageByBot.replace('https://vxtwitter.com/' || 'https://fxtwitter.com/', 'https://fxtwitter.com/')

    await mensaje.channel.send(sendMessageByBot);
    await mensaje.delete();
  }
})


let handlers = ['eventos', 'comandos'];
handlers.forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
