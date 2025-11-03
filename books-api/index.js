// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

//Importing all of our node modules
import express from "express"; // the framework that lets us build webservers
import fs from "fs/promises"; // the file system module lets us read and write data from files

//Declare a variable named app and call the express() function to create a new instance of express so we can use all of the methods, fucntions, properties of express
// which will be saved in app
const app = express();

//Defining out port number
//What port should our server listen to?
const port = 3000; // you can use any port # but developers commonly use 3000. also there are some port numbers you cannot use

//Declaring that this server will be receiving and responding to requests in JSON
app.use(express.json());

//Turn on our server so that it can listen for requests and respond to those requests at our port #
//Hello you are on , listen to requests and respond to those requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
}); //this method is turning on our server

// We will create the beginnings of a CRUD application
// CRUD stands for Create Read Update Delete

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllBooks()

async function getAllBooks() {
  // We want to read data from the books-data.json file
  // The fs.readFile() method takes in 2 parameters:
  //   1. The file path to the file we want to read from
  //   2. The encoding
  const data = await fs.readFile("./books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);
  return parsedBooks;
}

// 2. getOneBook(index)

async function getOneBook(index) {
  // read the books data from the books-data.json file
  const data = await fs.readFile("./books-data.json", "utf8");

  // parse the books data to turn it from JSON to Javascript format
  const parsedBooks = JSON.parse(data);

  // return the data we're looking for: the one book at the specified index
  return parsedBooks[index];
}

// 3. getOneBookTitle(index)

async function getOneBookTitle(index) {
  // read the books data from the books-data.json file
  const data = await fs.readFile("./books-data.json", "utf8");

  // parse the books data to turn it from JSON to Javascript
  const parsedBooks = JSON.parse(data);

  // return the data we're looking for: the title of the book at the specified index
  return parsedBooks[index].title;
}

async function updateOneBookTitle(index, newBookTitle) {
  //read from the file to get the books data
  const data = await fs.readFile("./books-data.json", "utf8");
  // parse the books data from json to js
  const parsedBooks = JSON.parse(data);
  // find the book and update its title
  const bookToUpdate = parsedBooks[index];
  // console.log(bookToUpdate);
  //to update the title we would first get the book
  parsedBooks[index].title = newBookTitle;
  console.log(bookToUpdate);
  //stringify books data back into json-
  const stringifyBooks = JSON.stringify(parsedBooks);

  // write the new data to the file
  fs.writeFile("./books-data.json", stringifyBooks, "utf8");
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books

app.get("/get-all-books", async (req, res) => {
  // call the helper function and save its return value in a variable
  const books = await getAllBooks();
  // res.send() sends text data in the response
  // res.json() sends JSON data in the response
  res.json(books);
});

// 2. GET /get-one-book/:index

app.get("/get-one-book/:index", async (req, res) => {
  // get the value of the index dynamic parameter
  const index = req.params.index;

  // call the helper function that gets the book from the file
  const book = await getOneBook(index);

  // send the book as JSON data in the response
  res.json(book);
});

// 3. GET /get-one-book-title/:index

app.get("/get-one-book-title/:index", async (req, res) => {
  // get the value of the index dynamic parameter
  const index = req.params.index;

  // call the helper function that gets the book's title at the specified index
  const bookTitle = await getOneBookTitle(index);

  // send the response as JSON — this is improper because the bookTitle String is not valid JSON. JSON always needs to be an object or array of objects
  //res.json(bookTitle)

  // Alternative 1: send the response as text
  // res.send(bookTitle);

  // Alternative 2: send the response as a valid JSON object
  // This is the preferred way, because most APIs these days are sending data in JSON format
  res.json({ title: bookTitle });
});

// POST /update-one-book-title/:index/:newBookTitle
app.post("/update-one-book-title/:index/:newBookTitle", async (req, res) => {
  const index = req.params.index;
  const newBookTitle = req.params.newBookTitle;
  // // call the helper function
  await updateOneBookTitle(index, newBookTitle);
  res.send(
    `book title at index ${index} successfully updated to 
      ${newBookTitle}!`
  );
});
