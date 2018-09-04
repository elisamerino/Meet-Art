const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
router.use(fileUpload());
const fs = require("fs");
const User = require("../models/User");

/* GET home page */
router.get("/private/:id", (req, res, next) => {
    id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) console.log(err);
        console.log("value is", user);

        res.render("user_profile", { user });
    });
});

router.get("/edit/:id", (req, res, next) => {
    let user = req.user;
    res.render("create/create-user", { user });
});

router.post("/edit", (req, res, next) => {
    // if (!req.files) return res.status(400).send("No files were uploaded.");
    // const file = req.files.picture;
    // const filename = req.files.picture.name;
    // file.mv("public/images/" + filename);
    // let image_src = `public/images/${filename}`;
    const { name, email, hobbies, city, relationship_status } = req.body;
    console.log("post", req);

    User.findByIdAndUpdate(req.user, { name, email, hobbies, city, relationship_status })
        .then(() => {
            console.log("updated user");
            res.redirect("/dashboard");
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;
