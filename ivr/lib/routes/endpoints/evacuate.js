const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;
const text = `<speak>Evacuate Page
Have Fun!
</speak>`;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;

  console.log('>>>> EVACUATE - HOME', req.body);

  try {
    const app = new WebhookResponse();
    app
    .gather({
        actionHook: '/evacuate/acceptevacuate',
        timeout:5,  
        finishOnKey: '#',
      //  recognizer: {hints:['yes', 'no']},
        input:['speech'],
        say:{text:`<speak>Are you planning on evacuating?</speak>`}
    });
    res.status(200).json(app);
  } catch (err) {
    console.log('>>> EVACUATE',err);
    res.sendStatus(503);
  }
});

router.post('/acceptevacuate', (req, res) => {
  console.log('>>>> EVACUATE - ACCEPT 2', req.body.speech.alternatives);

    let isEvacuating = false;

    if(req.body.speech.alternatives.length > 0){
        let response = req.body.speech.alternatives[0].transcript;
        console.log(response);
        isEvacuating = (response == 'yes' ||
        response == 'yeah');
    }

    

    console.log('Evacuating?', isEvacuating);

    try {
      const app = new WebhookResponse();
      if(isEvacuating){
      app.gather({
        say:{text:`<speak>It seems like Orlando might be your best evacuation zone? Would you like to evacuate to Orlando?</speak>`},
        finishOnKey: '#',
        input:['speech'],
        actionHook: '/evacuate/acceptzone'
      })
    }
    else {
        app.say({
            text:`<speak>OK - thanks for letting us know, if you change your mind please call back</speak>`
        })
        app.hangup()
    }

      res.status(200).json(app);
    } catch (err) {
        console.log('>>> EVACUATE',err);
      res.sendStatus(503);
    }
  });

  
router.post('/acceptzone', (req, res) => {
    console.log('>>>> EVACUATE - ZONE', req.body.speech.alternatives);
  
      let isEvacuating = false;
  
      if(req.body.speech.alternatives.length > 0){
          let response = req.body.speech.alternatives[0].transcript;
          console.log(response);
          isEvacuating = (response == 'yes' ||
          response == 'yeah');
      }
  
      isEvacuating = true;

      console.log('Evacuating?', isEvacuating);
  
      try {
        const app = new WebhookResponse();
        if(isEvacuating){
        app.gather({
          say:{text:`<speak>The best time for you to leave will be October 18th at 4PM.  It looks like the Best Western has rooms available, would you like us to connect you?</speak>`},
          finishOnKey: '#',
          input:['speech'],
          actionHook: '/evacuate/accepthotel'
        })
      }
      else {
          app.say({
              text:`<speak>OK - thanks for letting us know, if you change your mind please call back</speak>`
          })
          app.hangup()
      }
  
        res.status(200).json(app);
      } catch (err) {
          console.log('>>> EVACUATE',err);
        res.sendStatus(503);
      }
    });

    
router.post('/accepthotel', (req, res) => {
    console.log('>>>> EVACUATE - HOTEL', req.body.speech.alternatives);
  
      let isEvacuating = true;
  
      console.log('Evacuating?', isEvacuating);
  
      try {
        const app = new WebhookResponse();
        if(isEvacuating){
            app.dial({
                target: [{
                    number:'17274609365',
                    type:'phone',
                    trunk:'Twilio'
                }]
            });
        
      }
      else {
          app.say({
              text:`<speak>OK - thanks for letting us know, if you change your mind please call back</speak>`
          })
          app.hangup()
      }
  
        res.status(200).json(app);
      } catch (err) {
          console.log('>>> EVACUATE - ACCEPT HOTEL',err);
        res.sendStatus(503);
      }
    });

  
router.post('/acceptzone', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /welcome/finish');
  try {
    const app = new WebhookResponse();
    app.say({text:`<speak>thank you for your name.</speak>`});
    res.status(200).json(app);
  } catch (err) {
    console.log('>>> EVACUATE',err);
    res.sendStatus(503);
  }
});

module.exports = router;
