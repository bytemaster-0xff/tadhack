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
        finishOnKey:'#',
        numDigits:10,
        timeout:20,
        input: ['digits','speech'],
        say:{text:`<speak>Welcome to the Hurricane Tracking Line, we have your telephone number as <say-as interpret-as="telephone" format="1">${req.body.from}</say-as> we found your number in the database.</speak>`}
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
    try {
      const app = new WebhookResponse();
      res.status(200).json(app);
    } catch (err) {
      logger.error({err}, 'Error');
      res.sendStatus(503);
    }
  });

module.exports = router;
