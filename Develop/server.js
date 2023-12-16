const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require ("path");

app.use(express.static("public"))

// code to serve up public file notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

// code to serve up public file index.html
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.listen(PORT, () =>
console.log(`App listening at ${PORT}`)
);