require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/db.js");
const videoRoute = require("./routes/videoRoute.js")

dbConnection();

const app = express();
app.use(express.json());


const PORT = 3005;

app.use("/videos",videoRoute)

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
