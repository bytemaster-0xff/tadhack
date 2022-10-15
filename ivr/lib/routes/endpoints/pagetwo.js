const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

const text = `<speak>Welcome to Page Two, so cool!</speak>`;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /pagetwo');
  console.log('>>>>>> PAGE 2 - POST ',  req.body);
  try {
    const app = new WebhookResponse();
    app
      
      .redirect({
        actionHook: "/pagetwo/firstname"
      });
      //.pause({length: 1.5})
      //.say({text});
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/firstname', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /pagetwo/firstname');
  console.log('>>>>>> PAGE 2 - FNAME ',  req.body);
  try {
    const app = new WebhookResponse();
    app
    .gather({
        actionHook: '/pagetwo/lastname',
        timeout: 8,
        input: ['speech'],
        say: {text:`<speak>Please say your first name.</speak>`}
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/lastname', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /pagetwo/lastname');
  console.log('>>>>>> PAGE 2 - LNAME ',  req.body);
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
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/zipcode', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /pagetwo/zipcode');
  console.log('>>>>>> PAGE 2 - ZIP ',  req.body);
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
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/done', (req, res) => {
  const {logger} = req.app.locals;
  console.log('>>>>>> PAGE 2 - DONE ',  req.body);
  try {
    const app = new WebhookResponse();
    //app
    //.say({text: `<speak>you pressed ${req.body.digits}</speak>`});
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;
