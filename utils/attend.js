const Events = require('../models/Events');
const User = require('../models/User');

function attend(event, user) {
	Events.findById({ _id: event }, (err, event) => {
		if (err) console.log(err);
		//console.log('ATTEND THIS EVENT: ' + event);

		if (event.attendees.indexOf(user) === 0) {
			console.log('already attending');
		} else {
			Events.findByIdAndUpdate(
				{ _id: event._id },
				{
					$push: { attendees: user }
				},
				{ new: true },
				(err, Event) => {
					if (err) console.log(err);
					console.log(event);
				}
			);
		}
	});
}

module.exports = {
	attend
};

// router.post('/:id/attend', (req, res) => {
// 	console.log(req.params.id);
// 	// //let user = req.user._id;
// 	// // console.log(req.user._id);
// 	// Events.find(req.params.id, (err, event) => {
// 	// 	console.log(req.params.id);
// 	// 	// 	if (err) console.log(err);
// 	// 	// if (event.attendees.indexOf(user) === 0) {
// 	// 	// 	console.log('already attending');
// 	// 	// } else {
// 	// 	// 	Events.findByIdAndUpdate(
// 	// 	// 		{ _id: _id },
// 	// 	// 		{
// 	// 	// 			$push: { attendees: user }
// 	// 	// 		},
// 	// 	// 		{ new: true },
// 	// 	// 		(err, Event) => {
// 	// 	// 			if (err) console.log(err);

// 	// 	// 			res.redirect('/:id');
// 	// 	// 		}
// 	// 	// 	);
// 	// 	// }
// 	// });
// });
