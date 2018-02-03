const botgram = require("botgram")
const bot = botgram("463941200:AAGvi6lLKpNcgqAjbpmYQzwBV_kraKY1tx0");
const cryptoService = require('./utils/cryptoService');

bot.command("start", "help", (msg, reply) =>
    reply.text("To get total market cap, do: /mkcap"));

bot.command("mkcap", (msg, reply) => {

    cryptoService.getTotalMarket((err, data)=>{
        if (err){
            next();
        }else {
            reply.text('Total Market Cap : ' + data);
        }
    });

});

bot.command((msg, reply) =>
    reply.text("Invalid command."));