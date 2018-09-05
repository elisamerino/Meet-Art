const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

//router.use(ensureLoggedIn());

const User = require("../models/User");

router.get("/", ensureLogin.ensureLoggedIn("/auth/login"), (req, res, next) => {
    console.log("hi from private");
    res.render("user_profile", { user: req.user });
});

/* GET home page */
router.get("/private/:id", ensureLogin.ensureLoggedIn("/auth/login"), (req, res, next) => {
    id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) console.log(err);
        console.log("value is", user);
        res.render("user_profile", { user });
    });
});

router.get("/edit/:id", ensureLogin.ensureLoggedIn("/auth/login"), (req, res, next) => {
    let user = req.user;
    res.render("create/create-user", { user });
});

router.post("/edit", (req, res, next) => {
    if (!req.files) return res.status(400).send("No files were uploaded.");
    const file = req.files.picture;
    const filename = file.name;

    req.files.picture.mv(`public/images/${req.user.id}.jpg`, function(err) {
        if (err) return res.status(500).send(err);

        const { username, email, presentation, picture, hobbies, city, relationship_status } = req.body;

        User.findByIdAndUpdate(req.user, {
            username,
            email,
            presentation,
            hobbies,
            picture,
            city,
            relationship_status
        })
            .then(() => {
                console.log("updated user");

                res.redirect("/dashboard");
            })
            .catch(error => {
                console.log(error);
            });
    });
});

module.exports = router;
