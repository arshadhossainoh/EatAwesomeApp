const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "restaurants.json");

function getStoredRestautants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  return storedRestaurants;
}

function showRestaurants(storeableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storeableRestaurants));
}

module.exports = {
  getStoredRestautants,
  showRestaurants,
};
