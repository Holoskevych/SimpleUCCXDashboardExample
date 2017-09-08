/**
 * Created by 6470b on 04.09.2017.
 */
'use strict';

var request = require('request'); // require in request
var config = require('./config.json');

var initGetVoiceCSQDetailsStats = { uri: 'http://' + config.uccxipaddr + ':9080/realtime/VoiceCSQDetailsStats' };

var apiCaller = function apiCaller(url, cb) {
    //use request to make the external http call to the JSON api
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            cb(body); // Send body/response to callback
        }
    });
};
// Call the api with a call back
var apiGetVoiceCSQDetailsStats = function apiGetVoiceCSQDetailsStats(cb) {
    return apiCaller(initGetVoiceCSQDetailsStats.uri, cb);
};
// Export the functions for external access
module.exports = {
    apiGetVoiceCSQDetailsStats: apiGetVoiceCSQDetailsStats
};
//# sourceMappingURL=api.js.map