const passport = require("passport");
const User = require("../models/User");
const Company = require("../models/Company");

passport.serializeUser((loggedInUser, cb) => {
    console.log("AT PASSPORT", loggedInUser);

    cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
        if (err) {
            cb(err);
            return;
        }

        cb(null, userDocument);
    });
});

passport.deserializeUser((companyIdFromSession, cb) => {
    Company.findById(companyIdFromSession, (err, companyDocument) => {
        if (err) {
            cb(err);
            return;
        }

        cb(null, companyDocument);
    });
});
