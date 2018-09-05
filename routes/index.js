const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
// const fs = require("fs");
const User = require('../models/User');
/* GET home page */

router.get('/', (req, res, next) => {
	res.render('index');
});

// router.get('/dashboard', (req, res) => {
// 	//if (req.user.email === undefined) {
// 	//  res.render("create/create-user");
// 	console.log('email is' + req.company.email);
// 	if (req.company.email === undefined) {
// 		res.render('create/create-company');
// 	} else {
// 		res.render('dashboard', { company: req.company });
// 	}
// });

module.exports = router;
