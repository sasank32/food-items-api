const express = require("express");
const cors = require("cors");
const foodItems = require("./food-items.json");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Food Items API is running",
    endpoints: [
      "/api/foods",
      "/api/foods/:id",
      "/api/foods/search?query=paneer",
      "/api/foods/category/:category",
    ],
  });
});

app.get("/api/foods", (req, res) => {
  res.json({
    total: foodItems.length,
    data: foodItems,
  });
});

app.get("/api/foods/search", (req, res) => {
  const query = (req.query.query || "").toLowerCase();

  const results = foodItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.cuisine.toLowerCase().includes(query) ||
      item.vegType.toLowerCase().includes(query),
  );

  res.json({
    total: results.length,
    data: results,
  });
});

app.get("/api/foods/category/:category", (req, res) => {
  const category = req.params.category.toLowerCase();

  const results = foodItems.filter(
    (item) => item.category.toLowerCase() === category,
  );

  res.json({
    total: results.length,
    data: results,
  });
});

app.post("/api/foods", (req, res) => {
  const newFood = req.body;

  foods.push(newFood);

  res.status(201).json({
    message: "Food created successfully",
    data: newFood,
  });
});

app.get("/api/foods", (req, res) => {
  let results = [...foodItems];

  const { search, category, cuisine, vegType } = req.query;

  if (search) {
    results = results.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (category) {
    results = results.filter(
      (item) =>
        item.category && item.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (cuisine) {
    results = results.filter(
      (item) =>
        item.cuisine && item.cuisine.toLowerCase() === cuisine.toLowerCase(),
    );
  }

  if (vegType) {
    results = results.filter(
      (item) =>
        item.vegType && item.vegType.toLowerCase() === vegType.toLowerCase(),
    );
  }

  res.json({
    total: results.length,
    data: results,
  });
});

app.get("/api/foods/:id", (req, res) => {
  const item = foodItems.find((food) => food.id === req.params.id);

  if (!item) {
    return res.status(404).json({
      message: "Food item not found",
    });
  }

  res.json(item);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Food Items API running on port ${PORT}`);
});
