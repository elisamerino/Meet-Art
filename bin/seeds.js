const mongoose = require('mongoose');

const Events = require('../models/Events');

const dbName = 'project';
mongoose.connect(`mongodb://localhost/${dbName}`);

const event = [
	{
		title: 'URBAN ART WEEK - tour',
		picture: 'https://source.unsplash.com/xb0wLfZH9Zo/1600x900',
		description: 'lets go have a walk',
		city: 'Berlin',
		date: 2018 + ', ' + 11 + ', ' + 21,
		type: 'Art',
		attendees: [],
		venue: 'https://www.google.de/maps/search/kw/@52.508199,13.3070429,12z/data=!3m1!4b1'
	},
	{
		title: 'Film ohne grenzen',
		picture: 'https://source.unsplash.com/xb0wLfZH9Zo/1600x900',
		description: 'lets go to the movies',
		city: 'Berlin',
		date: 2018 + ', ' + 10 + ', ' + 24,
		type: 'Cinema',
		attendees: [],
		venue: 'https://www.google.de/maps/search/kw/@52.508199,13.3070429,12z/data=!3m1!4b1'
	}
];
Events.create(event, (err) => {
	if (err) {
		throw err;
	}
	console.log(`Created ${event.length} event`);
	mongoose.connection.close();
});
