const request = require('request');
const accounting = require('../lib/accounting');
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

module.exports = {
    getTotalMarket : getTotalMarket
}