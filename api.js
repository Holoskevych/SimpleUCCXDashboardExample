/**
 * Created by 6470b on 04.09.2017.
 */
const request = require('request'); // require in request
const config = require('./config.json');

const initGetVoiceCSQDetailsStats = {uri: 'http://' + config.uccxipaddr + ':9080/realtime/VoiceCSQDetailsStats'};

const apiCaller = function (url, cb) {
    //use request to make the external http call to the JSON api
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            cb(body);// Send body/response to callback
        }
    })
};
// Call the api with a call back
const apiGetVoiceCSQDetailsStats = function(cb) {
    return apiCaller(initGetVoiceCSQDetailsStats.uri, cb);
};
// Export the functions for external access
module.exports = {
    apiGetVoiceCSQDetailsStats: apiGetVoiceCSQDetailsStats
};