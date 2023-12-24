const express = require("express");
const PORT = process.env.PORT || 3001; // Define the port for the server to listen on
const app = express(); // Initialize Express application

const htmlRoutes = require("./routes/html-routes"); // Import HTML routes
const apiRoutes = require("./routes/api-routes"); // Import API routes

app.use(express.static("public")); // Serve static files in the public directory
app.use(express.json()); // Parse incoming JSON data

app.use("/api", apiRoutes); // Use API routes at /api endpoint
app.use("/", htmlRoutes); // Use HTML routes at the root endpoint

app.listen(PORT, () =>
    console.log(`App listening at ${PORT}`) // Start the server and listen for connections on the defined port
);
