const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require ("path");
const fs = require ("fs");
const {v4: uuid} = require ("uuid");

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
// api route - post request, receive note, add to db.json, then return new note
app.post("/api/notes", (req,res)=>{
    const{title,text} = req.body;
    if (title && text){
        const newNote = {
            title,
            text,
            uuid: uuid()
        }
        fs.readFile("./db/db.json", (err, data) =>{
            if (err){
                console.log(err)
                return res.status(500).json({message:"Internal Server Error"});
            }
            let notes = JSON.parse(data)
            notes.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(notes), (err) =>{
                if (err){
                    console.log(err)
                    return res.status(500).json({message:"Internal Server Error"});
                }
                res.json(newNote)
            })
        })
    }
})

app.listen(PORT, () =>
console.log(`App listening at ${PORT}`)
);