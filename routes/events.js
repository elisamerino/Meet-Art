const express = require('express');
const router = express.Router();

// const fs = require("fs");
const Events = require('../models/Events');
const User = require('../models/User');
const { attend } = require('../utils/attend');

// /* GET home page */
router.get('/:id', (req, res, next) => {
	if (req.user === undefined) {
		res.redirect('auth/signup');
	} else if (req.user.email === undefined && req.user.collection.collectionName === 'users') {
		res.render('create/create-user', { user: req.user });
	} else if (req.user.email === undefined && req.user.collection.collectionName === 'companies') {
		// console.log(req.user.collection.collectionName);
		res.render('create/create-company', { user: req.user });
	} else {
		let user = req.user;
		//console.log(req.params.id);
		// const id = req.param.id;
		// console.log(id);
		Events.findById(req.params.id).then((event) => {
			User.find().then((users) => {
				//	let attendantsNum = event.attendees.length;
				//	console.log('attending' + attendantsNum);
				res.render('event-page', { event, user });

				// attendantsId.forEach((element) => {
				// 	if (users.id === attendantsId) {
				// 		console.log('USERNAME');
				// 	}

				// });
			});
		});
	}
});

// router.get("/edit", (req, res, next) => {
//     res.render("create/post-event");
// });

router.post('/:id/attend', (req, res) => {
	console.log(req.params.id);
	attend(req.params.id);
});

module.exports = router;
