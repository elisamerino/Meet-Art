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
		title: 'Berlin indiependent film Festival',
		picture: 'https://source.unsplash.com/ntIz9ciFKPs/1600x900',
		description:
			'The Berlin Independent Film Festival is at the epicentre for low-budget filmmaking in Europe. BIFF is not associated with the Berlinale, but it runs at the same time, and in the same city as the European Film Market and draws on all the film industry power gathered in Berlin for that event.',
		city: 'Berlin',
		date: 2018 + ', ' + 09 + ', ' + 15,
		type: 'Cinema',
		attendees: [],
		venue: 'https://www.google.de/maps/search/kw/@52.508199,13.3070429,12z/data=!3m1!4b1'
	},
	{
		title: 'Urban Art Week',
		picture: 'https://source.unsplash.com/xb0wLfZH9Zo/1600x900',
		description:
			'Think about Freedom  - Denk mal an Freiheit! Lets celebrate Berlin amazing street art culture with a stroll in Kreuzberg.',
		city: 'Berlin',
		date: 2018 + ', ' + 09 + ', ' + 15,
		type: [ 'Art', 'Urban' ],
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
