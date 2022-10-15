// import {request_info} from 'pageone_function';

const router = require("express").Router();
const WebhookResponse = require("@jambonz/node-client").WebhookResponse;
const text = `<speak>Hello, I will be assisting you in setting up a friends and family circle. I will need a first name, last name, and their ten digit telephone number.</speak>`;

router.post("/", (req, res) => {
	const { logger } = req.app.locals;
	logger.debug({ payload: req.body }, "POST /pageone");
	try {
		const app = new WebhookResponse();
		app.pause({ length: 1.5 }).say({ text }).redirect({
			actionHook: "/pageone/prompt",
		});

		res.status(200).json(app);
	} catch (err) {
		logger.error({ err }, "Error");
		res.sendStatus(503);
	}
});

router.post("/prompt", (req, res) => {
	const { logger } = req.app.locals;
	const first_name = new WebhookResponse();

	console.log(">>>>>>>>ASK FOR FIRST NAME WITH PAGE 1<<<<<<<<<<<<<", req.body);

	first_name
		.pause({
			length: 1.5,
		})
		.gather({
			input: ["speech"],
			finishOnKey: "#",
			actionHook: "/pageone/collectnames",
			say:"Please state the person's first and last name and then enter the pound sign."
		});


	res.status(200).json(first_name);
});

router.post("/collectnames", (req, res) => {
	const { logger } = req.app.locals;
	
	console.log(">>>>>>>>GOT FIRST AND LAST NAME WITH PAGE 1<<<<<<<<<<<<<", req.body);
	
	const promptForPhone = new WebhookResponse();

	promptForPhone	
		.pause({
			length: 1.5,
		})
		.gather({
			input: ["digits","speech"],
			finishOnKey: "#",
			actionHook: "/pageone/phone_num",
			say:"Please enter the phone number and then enter the pound sign."
		});

	res.status(200).json(promptForPhone);
});

router.post("/phone_num", (req, res) => {
	const { logger } = req.app.locals;
	logger.debug({ payload: req.body }, "POST /pageone/phone_num");

	const phone_num = new WebhookResponse();

	phone_num
		.pause({
			length: 1.5,
		})

		.say({
			text: "Please state or enter the person's phone number and then enter the pound sign.",
		})
		.gather({
			input: ["speech", "digits"],
			finishOnKey: "#",
			actionHook: "/pageone/collect/",
		})
		.redirect({ actionHook: "/pageone/add_more" });

	console.log(">>>>>>>>GOT PHONE NUMBER WITH PAGE 1<<<<<<<<<<<<<", req.body);

	res.status(200).json(phone_num);
});

router.post("/add_more", (req, res) => {
	const { logger } = req.app.locals;
	logger.debug({ payload: req.body }, "POST /pageone/process");

	const add_more = new WebhookResponse();

	add_more
		.pause({
			length: 1.5,
		})
		.say({
			text: "Would you like to add another person? Press one to add another person or press any other number followed by the pound sign to end the call.",
		})
		.gather({
			input: ["digits"],
			finishOnKey: "#",
			actionHook: "/pageone/collect/",
		});

	console.log(">>>>>>>>FINISHED WITH PAGE 1<<<<<<<<<<<<<", req.body);

	if (req.body.digits == "1") {
		logger.debug("you pressed 1");
		add_more.redirect({
			actionHook: "/pageone",
		});
	} else {
		add_more.hangup();
	}

	res.status(200).json(add_more);
});

module.exports = router;
