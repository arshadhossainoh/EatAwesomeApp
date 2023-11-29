const express = require("express");
const router = express.Router();

// instead of app you can use router

router.get("/", (req, res) => {
  // we dont need filepath now due to ejs, use render instead
  //const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.render("index");
});

router.get("/about", (req, res) => {
  //const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.render("about");
});

module.exports = router;
