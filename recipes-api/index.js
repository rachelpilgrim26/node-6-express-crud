// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import fs from "fs/promises";
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// helper function 1 get all recipes from the json file
// read the raw text content of the recipes json file
// convert the json text into a javascript array of recipe objects
// return the full list of recipe objects to whoever called this function
// 1. getAllRecipes()
async function getAllRecipes() {
  const data = await fs.readFile("./recipes-data.json", "utf8");
  const recipes = JSON.parse(data);
  return recipes;
}

// 2. getOneRecipe(index)
// get one recipe by its index position in the array
// read the raw text content of the recipes json file
// convert the json text into a javascript array of recipe objects
// grab the one recipe at the index position requested
// return that single recipe object to whoever called this function
async function getOneRecipe(index) {
  const data = await fs.readFile("./recipes-data.json", "utf8");
  const recipes = JSON.parse(data);
  return recipes[index];
}

// 3. getAllRecipeNames()
//get an array of only recipe names
// read the raw text content of the recipes json file
// convert the json text into a javascript array of recipe objects
// build a new array that only keeps the name field from each recipe
// return the list of recipe names to whoever called this function
async function getAllRecipeNames() {
  const data = await fs.readFile("./recipes-data.json", "utf8");
  const recipes = JSON.parse(data);
  const names = recipes.map((recipe) => recipe.name);
  return names;
}

// 4. getRecipesCount()
//get the total number of recipes
// read the raw text content of the recipes json file
// convert the json text into a javascript array of recipe objects
// count how many recipe objects are in the array
// return the number of recipes to whoever called this function
async function getRecipesCount() {
  const text = await fs.readFile("./recipes-data.json", "utf8");
  const recipes = JSON.parse(text);
  return recipes.length;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes
//handle get request to return all recipes
// call helper to load every recipe from the json file
// send back the full recipes array as a json response to the client
app.get("/get-all-recipes", async (req, res) => {
  const recipes = await getAllRecipes();
  res.json(recipes);
});

// 2. GET /get-one-recipe/:index
// handle get request to return one recipe by index
// convert the index from the url string into a number
// call helper to get the specific recipe at that index
// send back that single recipe object as a json response to the client
app.get("/get-one-recipe/:index", async (req, res) => {
  const index = Number(req.params.index);
  const recipe = await getOneRecipe(index);
  res.json(recipe);
});

// 3. GET /get-all-recipe-names
//handle get request to return all recipe names
// call helper to get the list of only recipe names
// send back the array of recipe names as a json response to the client
app.get("/get-all-recipe-names", async (req, res) => {
  const names = await getAllRecipeNames();
  res.json(names);
});

// 4. GET /get-recipes-count
//handle get request to return the number of recipes
// call helper to get how many recipes exist in the json file
// send back an object with the count value so the client can read it easily
app.get("/get-recipes-count", async (req, res) => {
  const count = await getRecipesCount();
  res.json({ count: count });
});
