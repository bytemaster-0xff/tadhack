const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;
const text = `<speak>
<prosody volume="loud">Hi there,</prosody> and welcome to our I O T Platform, called 
<sub alias="nuv I O T">NuvIoT</sub> where the focus is on configuration rather then coding.

Have Fun!
</speak>`;

router.post('/collect', (req, res) => {
  const {logger} = req.app.locals;

  console.log('>>>> WELCOME - COLLECT', req.body);

  try {
    const app = new WebhookResponse();
    app
    .gather({
        actionHook: '/welcome/process',
        timeout:60,
        numDigits:1,
        input: ['digits','speech'],
        say:{text:`<speak>Please enter your app number.</speak>`}
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/process', (req, res) => {
    const {logger} = req.app.locals;
    console.log('>>>> WELCOME - Process', req.body);
    
    let nextPage = '';

    if(req.body.digits == '1'){
      console.log('>>>> WELCOME - You Pressed One');
      nextPage = '/pageone';
    }
    else if(req.body.digits == '2'){
      console.log('>>>> WELCOME - You Pressed Two');
      nextPage = '/pagetwo';
    } 
    else if(req.body.digits == '3'){
      console.log('>>>> WELCOME - You Pressed Three');
      nextPage = '/pagethree';
    }
    else if(req.body.digits == '4'){
      console.log('>>>> WELCOME - You Pressed Four');
      nextPage = '/pagefour';
    }
    else if(req.body.digits == '5'){
      console.log('>>>> WELCOME - You Pressed Five');
      nextPage = '/pagefive';
    }
    else if(req.body.digits == '6'){
      console.log('>>>> WELCOME - You Pressed Six');
      nextPage = '/pagesix';
    }

    try {
      const app = new WebhookResponse();
      app.redirect({
        actionHook: nextPage
      })
      res.status(200).json(app);
    } catch (err) {
      logger.error({err}, 'Error');
      res.sendStatus(503);
    }
  });

  
router.post('/finish', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /welcome/finish');
  try {
    const app = new WebhookResponse();
    app.say({text:`<speak>thank you for your name.</speak>`});
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;
