const express = require("express");
const mongoose = require("mongoose");

const app = express();

const cors = require("cors");
const router = require("./routes/AuthRoutes");
require("dotenv").config();

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;
const URL = process.env.DATABASE_URL;
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173", "https://task-finall.vercel.app"], // Add your frontend domains
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable credentials (cookies, authorization headers, etc)
  optionsSuccessStatus: 200,
};

app.get("/", (req, res) => {
  res.send("App working lad");
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/user/", router);

app.listen(PORT, () => {
  console.log("Listening lad");
});

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });
