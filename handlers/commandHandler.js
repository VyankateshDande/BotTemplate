module.exports = {
    name: 'commandHandler',
    run (interaction, bot) {
        if ( interaction.type != 'APPLICATION_COMMAND') return;
        else {
            bot.commands.get(interaction.name).execute(interaction, bot);
        };
    }
}