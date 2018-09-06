const express = require('express');
const router = express.Router();

const { attend } = require('../utils/attend');
// const fs = require("fs");
const Events = require('../models/Events');

router.get('/create', (req, res, next) => {
	res.render('create/post-event', { user: req.user });
});

router.post('/create', (req, res, next) => {
	if (!req.files) return res.status(400).send('No files were uploaded.');
	const file = req.files.picture;
	file.mv(`public/images/${req.event.id}.jpg`, function(err) {
		if (err) return res.status(500).send(err);

		const { title, type, description, picture, city, venue } = req.body;

		new Events({
			title,
			type,
			description,
			date,
			picture,
			city,
			venue
		})
			.save()
			.then(() => {
				console.log('event created');

				res.redirect('/:id'); //link to the event/id/profile
			})
			.catch((error) => {
				console.log(error);
			});
	});
});

// /* GET home page */
// router.get('/:id', (req, res, next) => {
// 	Events.findById(req.params.id)
// 		.then((event) => res.render('event-page', { event: req.params }))
// 		.catch((err) => console.log(err));
// });
// /* GET home page */
router.get('/:id', (req, res, next) => {
	if (req.user === undefined) {
		res.redirect('auth/signup');
	} else if (req.user.email === undefined && req.user.collection.collectionName === 'users') {
		res.render('create/create-user', { user: req.user });
	} else if (req.user.email === undefined && req.user.collection.collectionName === 'companies') {
		res.render('create/create-company', { user: req.user });
	} else {
		let user = req.user;

		Events.findById(req.params.id).then((event) => {
			User.find().then((users) => {
				res.render('event-page', { event, user });
			});
		});
	}
});

router.post('/:id/edit', (req, res, next) => {
	if (!req.files) return res.status(400).send('No files were uploaded.');
	const file = req.files.picture;
	if (file === '') {
		res.render('auth/signup', { message: 'You need to upload an event pic' });
		return;
	}
	file.mv(`public/images/${req.params.id}.jpg`, function(err) {
		if (err) return console.log(err);

		const { title, type, description, picture, city, venue } = req.body;

		Events.findByIdAndUpdate(req.params.id, {
			title,
			type,
			description,
			date,
			picture,
			city,
			venue
		})
			.then(() => {
				let event = req.params.id;
				console.log('updated event');

				res.redirect('/event-page', { event });
			})
			.catch((error) => {
				console.log(error);
			});
	});
});

router.post('/:id/attend', (req, res) => {
	console.log(req.params.id);
	attend(req.params.id);
});

module.exports = router;
