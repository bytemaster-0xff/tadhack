const router = require("express").Router();
const WebhookResponse = require("@jambonz/node-client").WebhookResponse;
const text = `<speak>Hello, I will be assisting you in setting up a friends and family circle.</speak>`;
const repo = require("./repo.js");
let friend_count = 0;
let cleanPhoneNumber;
let user;

//Welcome
router.post("/", async (req, res) => {
	const { logger } = req.app.locals;
	logger.debug({ payload: req.body }, "POST /pageone");

	cleanPhoneNumber = req.body.from.replace(/[^0-9.]/g, "");

	user = await repo.getUser(cleanPhoneNumber);

	try {
		const app = new WebhookResponse();
		app.pause({ length: 1.5 }).say({ text }).redirect({
			actionHook: "/pageone/prompt_one",
		});

		res.status(200).json(app);
	} catch (err) {
		logger.error({ err }, "Error");
		res.sendStatus(503);
	}
});

//Prompts for first name of friend
router.post("/prompt_one", async (req, res) => {
	const first_name = new WebhookResponse();

	console.log(
		">>>>>>>>ASK FOR FIRST NAME WITH PAGE 1<<<<<<<<<<<<<",
		req.body
	);

	first_name
		.pause({
			length: 0.5,
		})
		.gather({
			input: ["speech"],
			finishOnKey: "#",
			actionHook: "/pageone/prompt_two",
			timeout: 10,
			say: {
				text: "Please state the person's first name followed by the pound sign.",
			},
		});
	res.status(200).json(first_name);
});

//Prompts for last name
router.post("/prompt_two", async (req, res) => {
	const last_name = new WebhookResponse();

	user.friend_count = friend_count;
	console.log(">>>>>>THIS IS THE PAYLOAD", req.body);
	console.log(">>>>>>THIS IS THE PAYLOAD", req.body.speech.alternatives);
	user.friend_count.friend_name = req.body.speech.alternatives[0].transcript;

	await repo.putUser(user);

	console.log(">>>>>>>>ASK FOR LAST NAME WITH PAGE 1<<<<<<<<<<<<<", req.body);

	last_name
		.pause({
			length: 1.5,
		})
		.gather({
			input: ["speech"],
			finishOnKey: "#",
			actionHook: "/pageone/collectnum",
			timeout: 10,
			say: {
				text: "Please state the person's last name followed by the pound sign.",
			},
		});
	res.status(200).json(last_name);
});

//Prompts for phone number
router.post("/collectnum", async (req, res) => {
	console.log(
		">>>>>>>>GOT FIRST AND LAST NAME WITH PAGE 1<<<<<<<<<<<<<",
		req.body
	);

	user.friend_count.friend_lastname =
		req.body.speech.alternatives[0].transcript;

	await repo.putUser(user);

	const promptForPhone = new WebhookResponse();

	promptForPhone
		.pause({
			length: 1.5,
		})
		.gather({
			input: ["digits"],
			finishOnKey: "#",
			actionHook: "/pageone/add_more",
			timeout: 10,
			say: {
				text: "Please enter the phone number followed by the pound sign.",
			},
		});
	res.status(200).json(promptForPhone);
});

//Asks if you want to add another person
router.post("/add_more", async (req, res) => {
	const add_more = new WebhookResponse();

	console.log(">>>>>>>>FINISHED WITH PAGE 1<<<<<<<<<<<<<", req.body);

	user.friend_count.friend_number = req.body.digits;

	await repo.putUser(user);

	add_more
		.pause({
			length: 1.5,
		})
		.gather({
			input: ["digits"],
			finishOnKey: "#",
			actionHook: "/pageone/add_or_hangup",
			timeout: 10,
			say: {
				text: "Press one to add another person or press any other number followed by the pound sign to end the call.",
			},
		});
	res.status(200).json(add_more);
});

//Circles back to the beginning or hangup
router.post("/add_or_hangup", async (req, res) => {
	const add_or_hangup = new WebhookResponse();

	console.log(">>>>>>display digits", req.body.digits);
	if (req.body.digits == "1") {
		add_or_hangup.redirect({
			actionHook: "/pageone/prompt_one",
		});
		friend_count++;
	} else {
		add_or_hangup.hangup();
	}
	res.status(200).json(add_or_hangup);
});

module.exports = router;
