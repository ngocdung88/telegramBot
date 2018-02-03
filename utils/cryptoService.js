const request = require('request');
const accounting = require('../lib/accounting');
function getTotalMarket(callback) {
    request('https://api.coinmarketcap.com/v1/global/', (err, body, res) => {
        try {
            if (body.statusCode === 200){
                let data = JSON.parse(res);
                let total = data.total_market_cap_usd;
                callback(null,accounting.formatMoney(total));
            }else {
               callback({});
            }
        }catch (e){
            callback(e)
        }
    })
}

module.exports = {
    getTotalMarket : getTotalMarket
}