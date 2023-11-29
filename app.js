//const fs = require("fs");
const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");
const { json } = require("body-parser");
const app = express();

// ejs setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// creating middleware to server static files
app.use(express.static("public"));

// incoming request should be parsed
app.use(express.urlencoded({ extended: false }));

// we are using here middleware for default & restaurant routes which is imported
app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

app.use(() => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render(500);
});

app.listen(3000);
