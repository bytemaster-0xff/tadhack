const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;
const repo = require('./repo.js');


router.post('/', async (req, res) => {
  try {
    const app = new WebhookResponse();
    app
      
      .redirect({
        actionHook: "/pagetwo/firstname"
      });
    res.status(200).json(app);
  } catch (err) {
    //logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/firstname', async (req, res) => {
  console.log('>>>>>> PAGE 2 - FNAME ',  req.body);
  try {
    app
    .gather({
        actionHook: '/pagetwo/lastname',
        timeout: 8,
        input: ['speech'],
        say: {text:`<speak>Please say your first name.</speak>`}
    });
    res.status(200).json(app);
  } catch (err) {
    //logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/lastname', async (req, res) => {
  console.log('>>>>>> PAGE 2 - LNAME ',  req.body);
  const app = new WebhookResponse();
  var user = await repo.getUser(cleanPhoneNumber);
  user.name = {'firstName': req.body.payload.transcript};
  await repo.putUser(user);

  try {
    const app = new WebhookResponse();
    app
    .gather({
        actionHook: '/pagetwo/zipcode',
        timeout: 8,
        input: ['speech'],
        say: {text:`<speak>Please say your last name.</speak>`}
    });
    res.status(200).json(app);
  } catch (err) {
    //logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/zipcode', async (req, res) => {
  console.log('>>>>>> PAGE 2 - ZIP ',  req.body);
  var user = await repo.getUser(cleanPhoneNumber);
  user.name.lastName = req.body.payload.transcript;
  await repo.putUser(user);
  try{
    const app = new WebhookResponse();
    app
    .gather({
        timeout: 8,
        numDigits:5,
        actionHook: '/pagetwo/done',
        input: ['digits','speech'],
        say: {text: `<speak>Please enter or say your zip code.</speak>`}
    });
  res.status(200).json(app);
  } catch (err) {
    //logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/done', async (req, res) => {
  console.log('>>>>>> PAGE 2 - DONE ',  req.body);
  var user = await repo.getUser(cleanPhoneNumber);
  user.name.zipcode = req.body.payload.digits;
  await repo.putUser(user);
  try {
    const app = new WebhookResponse();
    res.status(200).json(app);
  } catch (err) {
    //logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;
