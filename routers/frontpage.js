var url = require("url");
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

// index
router.get("/frontpage", (req, res) => {
	res.render("frontpage/index");
});

module.exports = router;
