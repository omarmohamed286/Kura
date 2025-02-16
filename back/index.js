const express = require("express");

require("dotenv").config();

const dbConnection = require("./config/db.js");

dbConnection();

const app = express();

const PORT = 3005;

app.get("/", (req, res) => {
    res.send("server is up")
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
