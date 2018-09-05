const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
    username: String,
    password: String,
    email: String,
    picture: String,
    type: String,
    city: String,
    presentation: String,
    website: String
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
