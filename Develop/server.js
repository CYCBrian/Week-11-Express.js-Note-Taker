const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require ("path");
const fs = require ("fs");

app.use(express.static("public"))

// html route - code to serve up public file notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

// html route - code to serve up public file index.html
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// api route - code to get api notes
app.get("/api/notes", (req,res) =>{
    fs.readFile("db/db.json", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message:"Internal Server Error"});
        }
        const notes = JSON.parse(data)
        res.json(notes)
    })
})

app.listen(PORT, () =>
console.log(`App listening at ${PORT}`)
);