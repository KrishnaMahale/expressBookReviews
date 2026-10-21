
const express = require("express");
const public_users = express.Router();

const books = require("./booksdb.js");
const users = require("./user.js");

// Get all books
public_users.get("/", function (req, res) {
    res.status(200).json(books);
});

// Get book by ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Get books by author
public_users.get("/author/:author", function (req, res) {
    const author = req.params.author.toLowerCase();
    const result = [];

    Object.keys(books).forEach(function (isbn) {
        if (
            books[isbn].author &&
            books[isbn].author.toLowerCase() === author
        ) {
            result.push(books[isbn]);
        }
    });

    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: "No books found for this author" });
    }
});

// Get books by title
public_users.get("/title/:title", function (req, res) {
    const title = req.params.title.toLowerCase();
    const result = [];

    Object.keys(books).forEach(function (isbn) {
        if (
            books[isbn].title &&
            books[isbn].title.toLowerCase() === title
        ) {
            result.push(books[isbn]);
        }
    });

    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: "No books found with this title" });
    }
});

// Get reviews for a book by ISBN
public_users.get("/review/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        res.status(200).json(book.reviews || {});
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Register a new user
public_users.post("/register", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    if (users[username]) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    users[username] = { password: password };

    return res.status(200).json({
        message: "User registered successfully"
    });
});

module.exports.general = public_users;
