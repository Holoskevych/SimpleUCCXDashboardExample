var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const localconfig = require('../config.json');

/* Settings */
router.get('/', function(req, res)
{
        res.render('Settings', {
            puccxipaddr :localconfig.puccxipaddr,
            succxipaddr :localconfig.succxipaddr,
            serverport :localconfig.serverport,
            adminusername :localconfig.adminusername,
            adminpassword :localconfig.adminpassword
        });
});

/* Settings API*/
router.get("/api", function (req, res) {
    res.send("For Test. API is running.");
});
/* Settings API - Update IP Addrs*/
router.put('/api/update/uccxipaddrs', function(req, res)
{
    var puccxipaddr = req.body.puccxipaddr;
    var succxipaddr = req.body.succxipaddr;

    console.log(puccxipaddr + ":" + succxipaddr);
    localconfig.puccxipaddr = puccxipaddr;
    localconfig.succxipaddr = succxipaddr;

    fs.writeFile('config.json', JSON.stringify(localconfig, null, 2), function (err) {
        if (err) return console.log(err);
        console.log('Updating config.json with IP Addresses: Publisher - ' + puccxipaddr + ',' + 'Subscriber - ' + succxipaddr);
    });
    //var senddata = {puccxipaddr: puccxipaddr, succxipaddr: succxipaddr};

    res.send(req.body);
});
/* Settings API - Update UCCX Adm Credentials*/
router.put('/api/update/uccxadmcredentials', function(req, res)
{

    var adminusername = req.query.adminusername;
    var adminpassword = req.query.adminpassword;

    console.log(adminusername + ":" + adminpassword);
    res.send('PUT - Adm Cred Update');
});
/* Settings API - Update UCCX Reporting Credentials*/
router.put('/api/update/uccxreportcredentials', function(req, res)
{

    var reportusername = req.query.reportusername;
    var reportpassword = req.query.reportpassword;

    console.log(reportusername + ":" + reportpassword);
    res.send('PUT - Rep Cred Update');
});

module.exports = router;