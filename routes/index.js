const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
router.use(fileUpload());
const fs = require("fs");
const User = require("../models/User");
/* GET home page */

router.get("/", (req, res, next) => {
    res.render("index");
});

router.get("/dashboard", (req, res) => {
    console.log(req.user.email);
    if (req.user.email === undefined) {
        res.render("create/create-user");
    } else {
        res.render("dashboard");
    }
});

module.exports = router;
