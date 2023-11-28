const fs = require("fs");
const path = require("path");

const express = require("express");
const uuid = require("uuid");
const { json } = require("body-parser");
const app = express();

// ejs setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// creating middleware to server static files
app.use(express.static("public"));

// incoming request should be parsed
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // we dont need filepath now due to ejs, use render instead
  //const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.render("index");
});

app.get("/restaurants", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  res.render("restaurants", {
    numOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

// dynamic route, id will be used to identify each
// Req.params property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /user/:name, then the “name” property is available as req.params.name. This object defaults to {}.
//Req.body contains key-value pairs of data submitted in the request body
app.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { rid: restaurantId });
    }
  }
});

app.get("/recommend", (req, res) => {
  //const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  res.render("recommend");
});
app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});
app.get("/confirm", (req, res) => {
  //const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.render("confirm");
});
app.get("/about", (req, res) => {
  //const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.render("about");
});

app.listen(3000);
