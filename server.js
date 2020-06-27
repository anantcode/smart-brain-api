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
    host: "127.0.0.1", //in prod, this should contain whereever we set up DB on hosted platform.
    user: "postgres", //could also have been anantpan
    password: "test",
    database: "smart-brain",
  },
});

console.log(db.select("*").from("users"));

const app = express();
app.use(express.json());
app.use(cors());

const databaseMock = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "1234",
      name: "Anant",
      email: "anant@gmail.com",
      password: "doodles",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  //   res.send("I hear you. This is working.");
  res.send("<h1>Hello Soumya :) </h1>");
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
  console.log(`app is running on port ${process.env.PORT}`);
});