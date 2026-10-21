
const express = require("express");
const axios = require("axios");

const public_users = express.Router();
const books = require("./booksdb.js");

// Change this URL if your books API runs at a different address.
const BOOKS_API_URL = "http://localhost:5000";

// Retrieve all books
public_users.get("/", async (req, res) => {
    try {
        const response = await axios.get(BOOKS_API_URL);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error retrieving books:", error.message);
        res.status(500).json({ message: "Unable to retrieve books" });
    }
});

// Retrieve a book by ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
    try {
        const response = await axios.get(BOOKS_API_URL);
        const allBooks = response.data;
        const isbn = req.params.isbn;
        const book = allBooks[isbn];

        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error retrieving book by ISBN:", error.message);
        res.status(500).json({ message: "Unable to retrieve book" });
    }
});

// Retrieve books by author
public_users.get("/author/:author", async (req, res) => {
    try {
        const response = await axios.get(BOOKS_API_URL);
        const allBooks = response.data;
        const author = req.params.author.toLowerCase();

        const result = Object.values(allBooks).filter(
            (book) =>
                book.author &&
                book.author.toLowerCase() === author
        );

        res.status(200).json(result);
    } catch (error) {
        console.error("Error searching by author:", error.message);
        res.status(500).json({ message: "Unable to search books" });
    }
});

// Retrieve books by title
public_users.get("/title/:title", async (req, res) => {
    try {
        const response = await axios.get(BOOKS_API_URL);
        const allBooks = response.data;
        const title = req.params.title.toLowerCase();

        const result = Object.values(allBooks).filter(
            (book) =>
                book.title &&
                book.title.toLowerCase() === title
        );

        res.status(200).json(result);
    } catch (error) {
        console.error("Error searching by title:", error.message);
        res.status(500).json({ message: "Unable to search books" });
    }
});

// Retrieve reviews for a book by ISBN
public_users.get("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        res.status(200).json(book.reviews || {});
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
