const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true,
        enum: ['Prose', 'Poetry', 'Drama'],
    },
    publishYear: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sold_out: {
        type: String,
        required: true,
        enum: ['yes', 'no'],
    }

});

module.exports = mongoose.model('Book', bookSchema);