const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

const Company = require("../models/Company");

/* GET home page */
router.get("/", ensureLogin.ensureLoggedIn("/auth/logincomp"), (req, res, next) => {
    res.render("company_profile", { user: req.user });
});

router.get("/create-company", (req, res, next) => {
    res.render("create/create-company", { user: req.user });
});
router.get("/private/:id", ensureLogin.ensureLoggedIn("/auth/logincomp"), (req, res, next) => {
    id = req.param.id;
    Company.findById(id).then(user => res.render("company_profile", { user }));
});

// router.get("/edit/:id", ensureLogin.ensureLoggedIn("/auth/logincomp"), (req, res, next) => {
//     let user = req.user;
//     res.render("create/create-company", { user });
// });

router.post("/edit", (req, res, next) => {
    if (!req.files) return res.status(400).send("No files were uploaded.");
    const file = req.files.picture;

    req.files.picture.mv(`public/images/${req.user.id}.jpg`, function(err) {
        if (err) return res.status(500).send(err);

        const { username, email, picture, city, presentation, website, type } = req.body;

        Company.findByIdAndUpdate(req.user, {
            username,
            email,
            type,
            picture,
            city,
            presentation,
            website
        })
            .then(() => {
                console.log("updated company");
                res.redirect("/company_profile");
            })
            .catch(error => {
                console.log(error);
            });
    });
});

module.exports = router;
