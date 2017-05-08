const { Command } = require('discord.js-commando');
const request = require('superagent');

module.exports = class NSFWAnimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nsfw-anime',
            group: 'randomimg',
            memberName: 'nsfw-anime',
            description: 'Sends a random (NSFW!) anime image.',
            guildOnly: true
        });
    }

    async run(msg) {
        if (!msg.channel.nsfw) return msg.say('This Command can only be used in NSFW Channels.');
        if (!msg.channel.permissionsFor(this.client.user).has('ATTACH_FILES'))
            return msg.say('This Command requires the `Attach Files` Permission.');
        try {
            const { body } = await request
                .get('https://konachan.net/post.json?tags=order:random&limit=1');
            return msg.channel.send({ files: [`https:${body[0].file_url}`] })
                .catch(err => msg.say(err));
        } catch (err) {
            return msg.say(err);
        }
    }
};
