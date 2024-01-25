const express = require("express");
const mongoose = require("mongoose");
var clc = require("cli-color");
const bookModel = require("./models/bookModel");
require("dotenv").config();
// constants
console.log(process.env.MONGO_URI);
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

// middlewears

app.use(express.json());

// APis
app.get("/", (req, res) => {
  res.send("Server is running ");
});

// book store api

app.post("/books", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    if (!title || !author || !publishYear) {
      return res.send({
        status: 400,
        message: "send all require feild: title ,author,publishYear",
      });
    }
    const newBook = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    try {
      const Book = await bookModel.create(newBook);
      console.log(Book);
      return res.send({
        status: 200,
        message: "Create database sucessfully",
        data: Book,
      });
    } catch (error) {
      return res.send({
        status: 500,
        message: "Some error in db",
      });
    }
  } catch (error) {
    return res.send({
      status: 500,
      message: "Some error in db",
    });
  }
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await bookModel.find({});
    return res.status(200).json({
      status: 200,
      count: books.length,
      data: books,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Some error in db",
      error: error,
    });
  }
});

// /get books by id

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findById(id);
    return res.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Some error in db",
      error: error,
    });
  }
});

// connect mongoDb
mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(clc.bgBlue(`App is running on = http://localhost:${PORT}`));
      console.log(clc.yellowBright("Mongo DB connect sucessfylly"));
    })
  )
  .catch((err) => console.log(err));
