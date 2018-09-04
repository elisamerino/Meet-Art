const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
router.use(fileUpload());
const fs = require("fs");
const Events = require("../models/Events");

/* GET home page */
router.get("/private/:id", (req, res, next) => {
    id = req.param.id;
    Events.findById(id).then(event => res.render("event_profile", { event }));
});

router.get("/edit", (req, res, next) => {
    res.render("create/post-event");
});

router.post("/edit", (req, res, next) => {
    // if (!req.files) return res.status(400).send("No files were uploaded.");
    // const file = req.files.picture;
    // const filename = req.files.picture.name;
    // file.mv("public/images/" + filename);
    // let image_src = `public/images/${filename}`;
    const { title, description, city, date, type, attendees, venue } = req.body;

    User.findByIdAndUpdate(req.user._id, { title, description, city, date, type, attendees, venue })
        .then(() => {
            console.log("updated company");
            res.redirect("/company_profile");
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;
