const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;
const text = `<speak>Welcome to Page Six</speak>`;

const repo = require('./repo.js');

router.post('/', async (req, res) => {
  const {logger} = req.app.locals;
  console.log(">>>>> PAGE 6", req.body);

  var cleanPhoneNumber = req.body.from.replace(/[^0-9.]/g, '');

  console.log(">>>> PAGE 6 incoming phone number", cleanPhoneNumber);
  console.log("+++++++PAGE 6", repo);
  var user = await repo.getUser(cleanPhoneNumber);
  console.log(user);
  user.lastUpdated = new Date().toISOString();
  user.name = {'firstName':'fred', 'lastName': 'flintStone', 'zipCode': '55555'};
  user.evacuated = false;
  await repo.putUser(user);

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
