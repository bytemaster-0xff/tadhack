const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;
const text = `<speak>Hello, I will be assisting you in setting up a friends and family circle of who to contact, I will need a first name, last name, and their ten digit telephone number.</speak>`;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /pageone');
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

router.post('/process', (req, res) => {
    const {logger} = req.app.locals;
    logger.debug({payload: req.body}, 'POST /pageone/process');
    
    logger.debug({number: req.body.digits});

		try {
				let first_name = new WebhookResponse();
				let last_name = new WebhookResponse();
				let phone_num = new WebhookResponse();

				first_name.gather(
						{
								"say":{
										"text": "Please say the person's first name."
								}
						},
						{
								"actionHook": '/pageone/collect/',
								"input": ["speech"],
								"finishOnKey":'#',
						},
				)

				last_name.gather(
						{
								"say":{
										"text": "Please say the person's last name."
								}
						},
						{
								"actionHook": '/pageone/collect/',
								"input": ["speech"],
								"finishOnKey":'#',
						},
				)

				phone_num.gather(
						{
								"say":{
										"text": "Please enter the person's ten digit telephone number."
								}
						},
						{
								"actionHook": '/pageone/collect/',
								"input": ["digits", "speech"],
								"numDigits": 10,
								"finishOnKey":'#',
						},
				)

		} catch (err) {

		}


  });

module.exports = router;
