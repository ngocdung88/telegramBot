const token = require('../config').token;
let url = 'https://api.telegram.org/bot' + token + '/';
const request = require('request');
var Bot = {
    /**
     *
     * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param text Text of the message to be sent
     * @param parse_mode Send 'Markdown' or 'HTML', if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in your bot's message.
     */
    sendMessage : function (chat_id, text , parse_mode, callback) {
        if (!chat_id || !text){
            return callback({})
        }

        request(url+'sendMessage?chat_id='+chat_id +'&text=' + text + '&parse_mode=' + parse_mode,function (err, res, body) {
            callback(err, body);
        })
    }
};

module.exports = Bot;