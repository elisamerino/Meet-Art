const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    picture: String,
    hobbies: [String],
    presentation: String,
    city: String,
    relationship_status: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;
