const express = require('express');
const echarts = require('echarts');
const router = express.Router();

const api = require('../api');

/* GET UCCX VoiceIAQStats. */
router.get('/', function(req, res)
{
    //call the api apiGet and create callback function
    api.apiGetVoiceIAQStats(function (data)
    {
        // render to the VoiceCSQDetailsStats.jade and pass the data from api call
        res.render('VoiceIAQStats', { result :data});
    });
});
module.exports = router;

