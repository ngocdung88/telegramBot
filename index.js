const botgram = require("botgram");
const config = require('./config');
const bot = botgram(config.token);
const cryptoService = require('./utils/cryptoService');

bot.command("start", "help", (msg, reply) =>
    reply.text("To get total market cap, do: /mkcap"));

bot.command("mkcap", (msg, reply) => {

    cryptoService.getTotalMarket((err, data)=>{
        if (err){
            next();
        }else {
            reply.markdown('*Total Market Cap* : ' + data);
        }
    });

});

bot.command((msg, reply) =>
    reply.text("Invalid command."));