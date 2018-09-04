const mongoose = require('mongoose');

const Events = require('../models/Events');

const dbName = 'project';
mongoose.connect(`mongodb://localhost/${dbName}`);

const event = [
	{
		title: 'Museum stroll',
		picture: 'https://source.unsplash.com/PGdMhonLLZk/1600x900',
		description: 'lets go have a walk',
		city: 'Berlin',
		date: 2018 + ', ' + 09 + ', ' + 21,
		type: 'Art',
		attendees: [],
		venue: 'https://www.google.de/maps/search/kw/@52.508199,13.3070429,12z/data=!3m1!4b1'
	},
	{
		title: 'Festival',
		picture: 'https://source.unsplash.com/ntIz9ciFKPs/1600x900',
		description: 'lets go to the movies',
		city: 'Berlin',
		date: 2018 + ', ' + 09 + ', ' + 15,
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
