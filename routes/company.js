const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

const Company = require("../models/Company");

/* GET home page */
router.get("/", ensureLogin.ensureLoggedIn("/auth/logincomp"), (req, res, next) => {
    res.render("company_profile", { user: req.company });
});

router.get("/private/:id", ensureLogin.ensureLoggedIn("/auth/logincomp"), (req, res, next) => {
    id = req.param.id;
    Company.findById(id).then(company => res.render("company_profile", { company }));
});

router.get("/edit", ensureLogin.ensureLoggedIn("/auth/logincomp"), (req, res, next) => {
    let company = req.company;
    res.render("create/create-company", { company });
});

router.post("/edit", (req, res, next) => {
    if (!req.files) return res.status(400).send("No files were uploaded.");
    const file = req.files.picture;
    const filename = req.files.picture.name;
    file.mv(`public/images/${req.company.id}.jpg`);
    // let image_src = `public/images/${filename}`;
    const { username, email, picture, city, presentation, website, type } = req.body;

    Company.findByIdAndUpdate(req.company, {
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

            res.redirect("/dashboard");
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;
