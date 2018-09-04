const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
router.use(fileUpload());
const fs = require("fs");
const Company = require("../models/Company");

/* GET home page */
router.get("/private/:id", (req, res, next) => {
    id = req.param.id;
    Company.findById(id).then(company => res.render("company_profile", { company }));
});

router.get("/edit", (req, res, next) => {
    res.render("create/create-company");
});

router.post("/edit", (req, res, next) => {
    // if (!req.files) return res.status(400).send("No files were uploaded.");
    // const file = req.files.picture;
    // const filename = req.files.picture.name;
    // file.mv("public/images/" + filename);
    // let image_src = `public/images/${filename}`;
    const { name, email, city, presentation, website, type } = req.body;

    Company.findByIdAndUpdate(req.company._id, { name, email, type, city, presentation, website })
        .then(() => {
            console.log("updated company");
            res.redirect("/company_profile");
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;
