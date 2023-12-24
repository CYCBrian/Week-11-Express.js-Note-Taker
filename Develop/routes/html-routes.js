const path = require("path");
const htmlRoutes = require("express").Router();

// GET request to serve the notes.html file when /notes endpoint is accessed
htmlRoutes.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html")); // Send the notes.html file as a response
});

// Catch-all route (*) to serve the index.html file for any other endpoint
htmlRoutes.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html")); // Send the index.html file as a response
});

module.exports = htmlRoutes; // Export the HTML routes module
