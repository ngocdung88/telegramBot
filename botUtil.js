const botgram = require("botgram");
const config = require('./config');
const bot = botgram(config.token);
const moment = require('moment');
const cryptoService = require('./utils/cryptoService');
const _ = require('lodash');
let tele = require('./utils/telegram');
let alert = [];

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

bot.command("price", (msg, reply, next) => {


    var [data] = msg.args(1);

    var [coin,prize] = data.split('/');

    if (!coin) {
        reply.text('Wrong format! Please give format like ex: BTC/USD , ETH/BTC, etc..');
        next();
    }

    if (!prize){
        prize = 'USD'
    }

    cryptoService.getPrize(coin, prize, (err, data) => {
        if (err) {
            next();
        } else {
            if (_.isString(data)){
                reply.text(data);
            } else {

                reply.text("Current "+ prize +" Price: " + _.first(_.values(data)));
            }
        }
    });
});


bot.command('ping', (msg , reply, next) =>{
    try {
        let chat_id = msg.user.id;
        var [seconds] = msg.args(1);
        let schedule = {
            chat_id : chat_id
        };
        let isExist = _.findIndex(alert, {chat_id : chat_id});

        if (isExist > -1){
            reply.text("currently,have a ping is set!");
            return;
        }

        reply.text("Notify Total market Cap every " + (parseInt(seconds) || 60) + ' seconds');


        let alertId  = setInterval(()=>{
            cryptoService.getTotalMarket((err, data)=>{
                if (err){
                    next();
                }else {
                    tele.sendMessage(chat_id,'*Total Market Cap* : ' + data.total,'Markdown', function (err, res) {
                        console.error(err);
                        console.log(res);
                    })
                }
            });
        },parseInt(seconds)*1000 || 60000);
        schedule.alertId = alertId;
        alert.push(schedule);
    } catch (e){
        reply.text("Error command.");
    }
});


bot.command('unping', (msg , reply, next) =>{
    try {
        let chat_id = msg.user.id;

        let pingObj = _.remove(alert, {chat_id : chat_id});

        if (_.first(pingObj)){
            clearInterval(_.first(pingObj).alertId);
        }


        reply.text("Unping success");

    } catch (e){
        reply.text("Error command.");
    }
});

bot.command((msg, reply) =>
    reply.text("Invalid command."));