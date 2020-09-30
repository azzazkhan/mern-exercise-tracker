const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv/config");

const server = express();
const port = process.env.PORT || 8080; // Default fallback port

// Allow server resources to be shared accross cross origins
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
server.use(express.json()); // To be able to load JSON encoded bodies

// Connect to our database server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("Successfully connect to MongoDB server!");
});

// Setup our routes
server.use("/exercises", require("./routes/exercises"));
server.use("/users", require("./routes/users"));

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
