const request = require('request');
const accounting = require('../lib/accounting');
const _ = require('lodash');
const cryptocurrencies = require('cryptocurrencies');
function getTotalMarket(callback) {
    request('https://api.coinmarketcap.com/v1/global/', (err, body, res) => {
        try {
            if (body.statusCode === 200){
                let data = JSON.parse(res);
                let total = data.total_market_cap_usd;
                let time = data.last_updated;
                console.log(data);
                callback(null,{total :accounting.format(total),time : time});
            }else {
               callback({});
            }
        }catch (e){
            callback(e)
        }
    })
}

function getPrize(coin , price, callback) {
    let _coin = _.toUpper(coin);
    let _price = _.toUpper(price);
    request('https://min-api.cryptocompare.com/data/price?fsym=' +_coin + '&tsyms='+ _price , function(err, body, res){
        try {

            if (body.statusCode === 200){
                let data = JSON.parse(res);
                if (data.Response === 'Error'){
                    callback(null, data.Message)
                } else {
                    callback(null, data);
                }
            }else {
                callback({});
            }
        }catch (e){
            callback(e)
        }

    })
}

function getMarketCap(coinName, callback) {

    let id = cryptocurrencies[_.toUpper(coinName)];

    if (!id){
        callback({});
        return;
    }

    id = _.kebabCase(id);

    request('https://api.coinmarketcap.com/v1/ticker/' + id, (err, body, res) => {
        try {
            if (body.statusCode === 200){
                let data = _.first(JSON.parse(res));
                let total = data.market_cap_usd;
                let time = data.last_updated;
                callback(null, data);
            }else {
                callback({});
            }
        }catch (e){
            callback(e)
        }
    })
}

module.exports = {
    getTotalMarket : getTotalMarket,
    getPrize : getPrize,
    getMarketCap : getMarketCap
}