const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");
const Company = require("../models/Company");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/login", (req, res, next) => {
    res.render("auth/login", { message: req.flash("error") });
});

authRoutes.get("/logincomp", (req, res, next) => {
    res.render("auth/logincomp", { message: req.flash("error") });
});

authRoutes.post(
    "/login",
    passport.authenticate("localUser", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
        failureFlash: true,
        passReqToCallback: true
    })
);

authRoutes.post(
    "/logincomp",
    passport.authenticate("localCompany", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/logincomp",
        failureFlash: true,
        passReqToCallback: true
    })
);

authRoutes.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

authRoutes.get("/signupcomp", (req, res, next) => {
    res.render("auth/signupcomp");
});

authRoutes.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
        res.render("auth/signup", { message: "Indicate username and password" });
        return;
    }

    User.findOne({ username }, "username", (err, user) => {
        if (user !== null) {
            res.render("auth/signup", { message: "The username already exists" });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass
        });
        newUser.save(err => {
            if (err) {
                res.render("auth/signup", { message: "Something went wrong" });
            } else {
                res.redirect("login");
            }
        });
    });
});

authRoutes.post("/signupcomp", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "" || password === "") {
        res.render("auth/signupcomp", { message: "Indicate company name and password" });
        return;
    }

    Company.findOne({ username: username }, "username", (err, user) => {
        if (user !== null) {
            res.render("auth/signupcomp", { message: "The name already exists" });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newCompany = new Company({
            username,
            password: hashPass
        });

        newCompany.save(err => {
            if (err) {
                res.render("auth/signupcomp", { message: "Something went wrong" });
            } else {
                res.redirect("logincomp");
            }
        });
    });
});

authRoutes.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = authRoutes;
