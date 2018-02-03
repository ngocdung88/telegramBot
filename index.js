const botgram = require("botgram")
const bot = botgram("463941200:AAGvi6lLKpNcgqAjbpmYQzwBV_kraKY1tx0");
const request = require('request');
const cryptoService = require('./utils/cryptoService');
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
    reply.text("Invalid command."))