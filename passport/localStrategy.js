const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Company = require("../models/Company");

passport.use(
    "localUser",
    new LocalStrategy((username, password, next) => {
        //check if
        User.findOne({ username }, (err, foundUser) => {
            if (err) {
                next(err);
                return;
            }

            if (!foundUser) {
                next(null, false, { message: "Incorrect username" });
                return;
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                next(null, false, { message: "Incorrect password" });
                return;
            }

            next(null, foundUser);
        });
    })
);

passport.use(
    "localCompany",
    new LocalStrategy((username, password, next) => {
        //check if
        console.log(username, password);
        Company.findOne({ username }, (err, foundCompany) => {
            if (err) {
                next(err);
                return;
            }
            if (!foundCompany) {
                next(null, false, { message: "Incorrect Company name" });
                return;
            }

            if (!bcrypt.compareSync(password, foundCompany.password)) {
                next(null, false, { message: "Incorrect password" });
                return;
            }

            next(null, foundCompany);
        });
    })
);
