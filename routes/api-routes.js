const fs = require("fs");
const { v4: uuid } = require("uuid");
const apiRoutes = require("express").Router();

// GET request to retrieve all notes
apiRoutes.get("/notes", (req, res) => {
    fs.readFile("db/db.json", (err, data) => {
        if (err) {
            console.log(err); // Log any errors to the console
            return res.status(500).json({ message: "Internal Server Error" }); // Send an error response if reading the file fails
        }
        const notes = JSON.parse(data); // Parse the retrieved data into a notes array
        res.json(notes); // Send the notes array as a JSON response
    });
});

// POST request to create a new note
apiRoutes.post("/notes", (req, res) => {
    const { title, text } = req.body; // Destructure title and text from the request body
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(), // Generate a unique ID for the new note using UUID
        };
        fs.readFile("./db/db.json", (err, data) => {
            if (err) {
                console.log(err); // Log any errors to the console
                return res.status(500).json({ message: "Internal Server Error" }); // Send an error response if reading the file fails
            }
            let notes = JSON.parse(data); // Parse the retrieved data into a notes array
            notes.push(newNote); // Add the new note to the notes array
            fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
                if (err) {
                    console.log(err); // Log any errors to the console
                    return res.status(500).json({ message: "Internal Server Error" }); // Send an error response if writing the file fails
                };
                res.json(newNote); // Send back the newly created note as a JSON response
            });
        });
    };
});

// DELETE request to remove a specific note by ID
apiRoutes.delete("/notes/:id", (req, res) => {
    console.log(req.params.id); // Log the ID of the note to be deleted
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err); // Log any errors to the console
            return res.status(500).json({ message: "Internal Server Error" }); // Send an error response if reading the file fails
        };
        let notes = JSON.parse(data); // Parse the retrieved data into a notes array
        // Filter out the note with the specified ID
        const filteredNotes = notes.filter((note) => note.id !== req.params.id);
        console.log(filteredNotes); // Log the updated notes without the deleted note
        // Write the updated notes (without the deleted note) back to the file
        fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), (err) => {
            if (err) {
                console.log(err); // Log any errors to the console
                return res.status(500).json({ message: "Internal Server Error" }); // Send an error response if writing the file fails
            }
            res.json(filteredNotes); // Send back the updated notes as a JSON response
        });
    });
});

module.exports = apiRoutes; // Export the API routes module
