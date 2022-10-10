const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.get('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'GET /index');
  try { 
    res.status(200).json({online:false,appVersion:15.2});
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;
