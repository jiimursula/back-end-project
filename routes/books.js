const express = require('express');
const router = express.Router();
const Book = require('../models/book_model');

// Gets all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        books.forEach(books => {
            books.sold_out = returnSoldOut(books)});
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Get one book
router.get('/:id', getBook, (req, res) => {
    res.json(res.book);
});

// Create a book
router.post('/', async (req, res) => {
    const dbBook = new Book({
        title: req.body.title,
        author: req.body.author,
        form: req.body.form,
        publishYear: req.body.publishYear,
        price: req.body.price,
        sold_out: checkSoldOut(req.body.sold_out) 
    });
    try {
        let resBook = await dbBook.save();
        resBook.sold_out = returnSoldOut(resBook);
        res.status(201).json(resBook);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Update a book
router.patch('/:id', getBook, async (req, res) => {
    if (req.body.title != null) {
        res.book.title = req.body.title;
    }
    if (req.body.author != null) {
        res.book.author = req.body.author;
    }
    if (req.body.form != null) {
        res.book.form = req.body.form;
    }
    if (req.body.publishYear != null) {
        res.book.publishYear = req.body.publishYear;
    }
    if (req.body.price != null) {
        res.book.price = req.body.price;
    }
    if (req.body.sold_out != null) {
        res.book.sold_out = checkSoldOut(req.body.sold_out);
    }
    try {
        const updBook = await res.book.save();
        updBook.sold_out = returnSoldOut(updBook);
        res.json(updBook);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
    try {
        await res.book.remove();
        res.json({ messsage: 'Book deleted.'})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    book.sold_out = returnSoldOut(book);
    res.book = book;
    next();
}

function checkSoldOut(so) {
    so = so.toLowerCase();
    if (so == "y") {
        return "yes";
    } else
    if (so == "n") {
        return "no";
    } else
    return so;
}

function returnSoldOut(book) {
    if(book.sold_out == "yes") {
        return "Yes"
    } else {
        return "No";
    }
}

module.exports = router;