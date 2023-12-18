const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

app.use(express.static("public"));
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () =>
console.log(`App listening at ${PORT}`)
);