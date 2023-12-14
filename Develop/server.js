const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express()

app.listen(express.static("public"))


app.listen(PORT, () =>
console.log(`App listening at ${PORT}`)
);