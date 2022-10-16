var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */ 
router.get('/place/:number/:webhook', async function(req, res, next) {
    console.log('Place', req.params.number, req.params.webhook)

    var base_url = 'https://api.jambonz.us';
    var auth = 'Bearer 5c1535a5-cf9a-4a65-888f-cd031c6b194d';
    var uri = `${base_url}/v1/Accounts/405f37c4-bbaf-4801-8daf-649ffd516667/Calls`;

    console.log('calling uri: ' + uri);

    var body = {
        "call_hook": "https://ivr.iothost.net/" + req.params.webhook,
        "call_status_hook":"https://ivr.iothost.net/call-status",
        "from": "+17278885330",
        "to": {
            "type": "phone",
            "number": "+" + req.params.number
        }
    }


    request({
        url: uri,
        headers: {
            Authorization:auth
        },
        method: "POST",
        json: true,  
        body: body
    }, function (error, response, body){
        console.log(new Date());
        console.log('response from call');
        console.log(response);
        res.sendStatus(200);
        });

});

module.exports = router;
