const request = require('request'); // require in request
const config = require('./config.json');

const initGetVoiceCSQDetailsStats = {uri: 'http://' + config.uccxipaddr + ':9080/realtime/VoiceCSQDetailsStats'};
const initGetVoiceIAQStats = {uri: 'http://' + config.uccxipaddr + ':9080/realtime/VoiceIAQStats'};

const apiCaller = function (url, cb) {
    //use request to make the external http call to the JSON api
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            cb(body);// Send body/response to callback
            //console.log(response);
        }
        if (error) {
            console.log(error);
            //cb("Error");
        }
    })};
// Call the api with a call back
const apiGetVoiceCSQDetailsStats = function(cb) {
    return apiCaller(initGetVoiceCSQDetailsStats.uri, cb);
};
const apiGetVoiceIAQStats = function(cb) {
    return apiCaller(initGetVoiceIAQStats.uri, cb);
};
// Export the functions for external access
module.exports = {
    apiGetVoiceCSQDetailsStats: apiGetVoiceCSQDetailsStats,
    apiGetVoiceIAQStats: apiGetVoiceIAQStats
};