const botgram = require("botgram");
const config = require('./config');
const bot = botgram(config.token);
const moment = require('moment');
const cryptoService = require('./utils/cryptoService');
let tele = require('./utils/telegram');

bot.command("start", "help", (msg, reply) =>
    reply.text("To get total market cap, do: /mkcap"));

bot.command("mkcap", (msg, reply , next) => {

    cryptoService.getTotalMarket((err, data)=>{
        if (err){
            next();
        }else {
            var time = new Date(data.time);
            reply.markdown('*Updated Time* : '  + moment(data.time*1000).format("HH:mm")+'\n*Total Market Cap* : ' + data.total);
        }
    });
});

bot.command('alert', (msg , reply) =>{
    let chat_id = msg.user.id;
    // console.log(msg);
    tele.sendMessage(chat_id,'<b>heheh</b>','HTML', function (err, res) {
        console.error(err);
        console.log(res);
    })
});

bot.command((msg, reply) =>
    reply.text("Invalid command."));