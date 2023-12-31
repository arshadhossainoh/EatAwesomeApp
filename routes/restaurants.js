const express = require("express");
const uuid = require("uuid");
const restaurantData = require("../util/restaurant-data");
const router = express.Router();

router.get("/restaurants", (req, res) => {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  const storedRestaurants = restaurantData.getStoredRestautants();
  // here we are sorting restaurants by name saying alibaba should come before bbc
  storedRestaurants.sort((resA, resB) => {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });
  res.render("restaurants", {
    numOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

// dynamic route, id will be used to identify each
// Req.params property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /user/:name, then the “name” property is available as req.params.name. This object defaults to {}.
//Req.body contains key-value pairs of data submitted in the request body
router.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;
  const storedRestaurants = restaurantData.getStoredRestautants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  res.status(404).render("404");
});

router.get("/recommend", (req, res) => {
  //const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  res.render("recommend");
});
router.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  // restaurant data here imported
  const restaurants = restaurantData.getStoredRestautants();
  restaurants.push(restaurant);

  restaurantData.showRestaurants(restaurants);
  res.redirect("/confirm");
});
router.get("/confirm", (req, res) => {
  //const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.render("confirm");
});

module.exports = router;
