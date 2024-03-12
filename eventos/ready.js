const { ActivityType } = require("discord.js");
const config = require('../config.json');

module.exports = {
    name: 'ready',
    run: (client) => {
        client.user.setUsername(config.nombreDelBot);
        client.user.setPresence({ activities: [{type: ActivityType.Watching, name: 'a Radio bañarse'}], status: 'online' });
        console.log(`✅ | ${client.user.username} Encendido`.green);
    }
}