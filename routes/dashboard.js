const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());
const fs = require('fs');
const Events = require('../models/Events');
const User = require('../models/User');

const Company = require('../models/Company');

router.get('/dashboard', (req, res) => {
	if (req.user === undefined) {
		console.log('UNDEFINED');
		res.redirect('auth/signup');
		// } else if (req.user.email === undefined && req.user.collection.collectionName === 'users') {
		// 	console.log(req.user.collection.collectionName);
		// 	res.render('create/create-user', { user: req.user });
		// } else if (req.user.email === undefined && req.user.collection.collectionName === 'companies') {
		// 	console.log(req.user.collection.collectionName);
		// 	res.render('create/create-company', { user: req.user });
	} else {
		Events.find().then((events) => {
			//res.send(events);
			let user = req.user;
			res.render('dashboard', { events, user });
		});
	}
});

router.post('/dashboard/attend', (req, res) => {
	//WE NEED TO RETRIEVE ID OF THE EVENT CLICKED AND ID OF THE USER
	const { _id } = req.body;
	let user = req.user._id;
	console.log(typeof user + user);

	Events.findById({ _id: _id }, (err, event) => {
		if (err) console.log(err);

		if (event.attendees.indexOf(user) === 0) {
			console.log('already attending');
		} else {
			Events.findByIdAndUpdate(
				{ _id: _id },
				{
					$push: { attendees: user }
				},
				{ new: true },
				(err, Event) => {
					if (err) console.log(err);

					res.redirect('/dashboard');
				}
			);
		}
	});
});

module.exports = router;
