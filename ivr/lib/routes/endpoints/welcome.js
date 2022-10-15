const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;
const text = `<speak>
<prosody volume="loud">Hi there,</prosody> and welcome to our I O T Platform, called 
<sub alias="nuv I O T">NuvIoT</sub> where the focus is on configuration rather then coding.

Have Fun!
</speak>`;

router.post('/collect', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /welcome/collect');
  try {
    const app = new WebhookResponse();
    app
    .gather({
        actionHook: '/welcome/process',
        timeout:60,
        finishOnKey:'#',
        input: ['digits','speech'],
        say:{text:`<speak>Please enter your app.</speak>`}
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/process', (req, res) => {
    const {logger} = req.app.locals;
    logger.debug({payload: req.body}, 'POST /welcome/process');
    
    let nextPage = '';

    logger.debug({number: req.body.digits});
    if(req.body.digits == '1'){
      logger.debug('you pressed 1');
      nextPage = '/pageone';
    }
    else if(req.body.digits == '2'){
      logger.debug('you pressed 2');
      nextPage = '/pagetwo';
    } 
    else if(req.body.digits == '3'){
      logger.debug('you pressed 3');
      nextPage = '/pagethree';
    }
    else if(req.body.digits == '4'){
      logger.debug('you pressed 4');
      nextPage = '/pagefour';
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
