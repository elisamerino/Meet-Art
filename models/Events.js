const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	title: String,
	picture: String,
	description: String,
	city: String,
	date: Date,
	type: [ String ],
	attendees: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
	venue: String
});

const Events = mongoose.model('Events', eventSchema);
module.exports = Events;

// const eventSchema = new Schema({
//     title: String,
//     picture: String,
//     description: String,
//     city: String,
//     date: Date,
//     type: String,
//     attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     venue: String
// });

// const Events = mongoose.model("Events", eventSchema);
// module.exports = Events;
