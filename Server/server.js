const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

// Use middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const con = require('./db/connection.js');

// Using routes
app.use(require('./routes/route.js'));

con.then(db => {
    if (!db) {
        console.error('Failed to connect to the database.');
        return process.exit(1);
    }

    // HTTP server listen
    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
});