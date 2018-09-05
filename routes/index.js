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

module.exports = router;
