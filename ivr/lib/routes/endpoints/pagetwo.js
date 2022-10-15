const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

const text = `<speak>Welcome to Page Two, so cool!</speak>`;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /pagetwo');
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
