const passport = require("passport");
const User = require("../models/User");
const Company = require("../models/Company");

passport.serializeUser((loggedInUser, cb) => {
    cb(null, { id: loggedInUser._id, role: loggedInUser.collection.collectionName });
});

passport.deserializeUser((userIdFromSession, cb) => {
    if (userIdFromSession.role === "users") {
        User.findById(userIdFromSession.id, (err, userDocument) => {
            if (err) {
                cb(err);
                return;
            }

            cb(null, userDocument);
        });
    } else if (userIdFromSession.role === "companies") {
        Company.findById(userIdFromSession.id, (err, userDocument) => {
            if (err) {
                cb(err);
                return;
            }

            cb(null, userDocument);
        });
    }
});
