const express = require('express');
const router = express.Router();

// const fs = require("fs");
const Events = require('../models/Events');

// /* GET home page */
router.get('/:id', (req, res, next) => {
	//console.log(req.params.id);
	// const id = req.param.id;
	// console.log(id);
	Events.findById(req.params.id).then((event) => res.render('event-page', { event }));
});

// router.get("/edit", (req, res, next) => {
//     res.render("create/post-event");
// });

module.exports = router;
