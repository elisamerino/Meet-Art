const express = require("express");
const router = express.Router();

// const fs = require("fs");
const Events = require("../models/Events");

router.get("/create", (req, res, next) => {
    res.render("create/post-event", { user: req.user });
});

router.get("/:id", (req, res, next) => {
    res.render("event-page", {});
});

router.post("/create", (req, res, next) => {
    if (!req.files) return res.status(400).send("No files were uploaded.");
    const file = req.files.picture;
    file.mv(`public/images/${req.event.id}.jpg`, function(err) {
        if (err) return res.status(500).send(err);

        const { title, type, description, picture, city, venue } = req.body;

        new Events({
            title,
            type,
            description,
            date,
            picture,
            city,
            venue
        })
            .save()
            .then(() => {
                console.log("event created");

                res.redirect("/:id"); //link to the event/id/profile
            })
            .catch(error => {
                console.log(error);
            });
    });
});

// /* GET home page */
router.get("/:id", (req, res, next) => {
    Events.findById(req.params.id)
        .then(event => res.render("event-page", { event: req.params }))
        .catch(err => console.log(err));
});

router.post("/:id/edit", (req, res, next) => {
    if (!req.files) return res.status(400).send("No files were uploaded.");
    const file = req.files.picture;
    if (file === "") {
        res.render("auth/signup", { message: "You need to upload an event pic" });
        return;
    }
    file.mv(`public/images/${req.params.id}.jpg`, function(err) {
        if (err) return console.log(err);

        const { title, type, description, picture, city, venue } = req.body;

        Events.findByIdAndUpdate(req.params.id, {
            title,
            type,
            description,
            date,
            picture,
            city,
            venue
        })
            .then(() => {
                console.log("updated event");

                res.redirect("/event-page");
            })
            .catch(error => {
                console.log(error);
            });
    });
});

module.exports = router;
