const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.ATLAS_URI)
    .then(db => {
        console.log("Database connected successfully");
        return db;
    }).catch(err => {
        console.log("Connection failed");
    });

module.exports = conn;