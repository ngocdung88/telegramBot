const botgram = require("botgram")
const bot = botgram("463941200:AAGvi6lLKpNcgqAjbpmYQzwBV_kraKY1tx0");
const request = require('request');
const accounting = require('./lib/accounting');
//var socket = require('socket.io-client')('https://streamer.cryptocompare.com/');

//var subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];
//socket.emit('SubAdd', { subs: subscription });
// socket.on("m", function(message) {
//     console.log(message);
// });

// socket.on('connect', function (data) {
//     console.log('is connect', data);
// });
// socket.on('cmsg', function (data) {
//     console.log(data);
//     socket.emit('my other event', {my: 'data'});
// });

bot.command("start", "help", (msg, reply) =>
    reply.text("To get total market cap, do: /mkcap"));
    //reply.text("To get price a currency, do: /price btc");

bot.command("alert", (msg, reply) => {
    var [seconds, text] = msg.args(2);
    if (!seconds.match(/^\d+$/) || !text) return next();

    setTimeout(() => reply.text(text), Number(seconds) * 1000)
})

bot.command("mkcap", (msg, reply) => {

    request('https://api.coinmarketcap.com/v1/global/',function (err, body, res) {

        try {
            if (body.statusCode === 200){
                let data = JSON.parse(res);
                let total = data.total_market_cap_usd;

                reply.text("Total Market Cap : $" + accounting.format(total));

            }else {
                next();
            }
        }catch (e){
            next();
        }


    })
})

bot.command((msg, reply) =>
    reply.text("Invalid command."))