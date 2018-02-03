const request = require('request');
const accounting = require('../lib/accounting');
export function getTotalMarket(callback) {
    request('https://api.coinmarketcap.com/v1/global/', (err, body, res) => {
        try {
            if (body.statusCode === 200){
                let data = JSON.parse(res);
                let total = data.total_market_cap_usd;
                callback(null,total);
            }else {
               callback({});
            }
        }catch (e){
            callback(e)
        }
    })
}