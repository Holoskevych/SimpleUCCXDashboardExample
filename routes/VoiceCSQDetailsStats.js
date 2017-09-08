var express = require('express');
const socketIo = require("socket.io");
var router = express.Router();

var api = require('../api');

/* GET UCCX VoiceCSQDetailsStats. */
router.get('/', function(req, res, next)
{
    //call the api apiGet and create callback function
    api.apiGetVoiceCSQDetailsStats(function (data)
    {
        // render to the VoiceCSQDetailsStats.jade and pass the data from api call
        res.render('VoiceCSQDetailsStats', { result :data});
    });
});
module.exports = router;

