const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());
const fs = require('fs');
const Events = require('../models/Events');
const User = require('../models/User');

const Company = require('../models/Company');

router.get('/dashboard', (req, res) => {
	console.log('USER EMAIL:' + req.user);

	if (req.user === undefined) {
		console.log('UNDEFINED');
		res.redirect('auth/signup');
	} else {
		Events.find()
			.then((events) => {
				//res.send(events);
				let user = req.user;
				res.render('dashboard', { events, user });
				// console.log('gettin you some events');
			})
			.catch((error) => {
				console.log(error);
				res.write('uh oh, something went wrong!?');
			});
		// res.render("dashboard");
	}
});

router.post('/dashboard/attend', (req, res) => {
	//WE NEED TO RETRIEVE ID OF THE EVENT CLICKED AND ID OF THE USERNAME
	const { _id } = req.body;
	let user = req.user;
	console.log({ _id });
	Events.findByIdAndUpdate({ _id: _id }, { $push: { attendees: user.id } }, { new: true }, function(
		err,
		Event
	) {
		if (err) throw err;

		res.redirect('/dashboard');
	});
	// Events.findByIdAndUpdate({ _id: _id }).then((event) => {
	// 	console.log(event.attendees);
	// 	event.attendees.push(user.id);
	//     res.redirect('/dashboard');
	// });
});

module.exports = router;
