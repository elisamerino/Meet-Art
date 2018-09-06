const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const ensureLogin = require("connect-ensure-login");
// const fs = require("fs");
const User = require("../models/User");
/* GET home page */
const util = require("util");

router.get("/", (req, res, next) => {
    res.render("index");
});

router.get("/user_profile", (req, res, next) => {
    res.render("user_profile", { user: req.user });
});

router.get("/company_profile", (req, res, next) => {
    res.render("company_profile", { user: req.user });
});

router.get("/profile", (req, res, next) => {
    if (req.user.collection.collectionName === "users") {
        res.render("user_profile", { user: req.user });
    } else if (req.user.collection.collectionName === "companies") {
        console.log("hi from company");
        res.render("company_profile", { user: req.user });
    }
});

module.exports = router;
