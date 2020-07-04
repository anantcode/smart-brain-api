const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg", //for postgres
  connection: {
    host: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

console.log(db.select("*").from("users"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  //   res.send("I hear you. This is working.");
  res.send("<h1>Hello Anant - YOLO - Learn and earn :) </h1>");
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImagePut(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running on port " + (process.env.PORT || 3000));
});
