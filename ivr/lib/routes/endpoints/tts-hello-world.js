const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;
const text = `<speak>
<prosody volume="loud">Hi there,</prosody> and welcome to our I O T Platform, called 
<sub alias="nuv I O T">NuvIoT</sub> where the focus is on configuration rather then coding.

Have Fun!
</speak>`;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /hello-world');
  try {
    const app = new WebhookResponse();
    app
      .pause({length: 1.5})
      .say({text});
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;
