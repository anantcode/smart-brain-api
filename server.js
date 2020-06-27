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
  res.send("Nothing special here");
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

//old material of register
//   bcrypt.hash(password, null, null, (err, hash) => {
//     console.log(hash);
//     databaseMock.users.psh({
//       id: "1235",
//       name: name,
//       email: email,
//       password: password
//       entries: 0,
//       joined: new Date(),
//     });
//   });

// old content from /signin
//   bcrypt.compare(
//     req.body.password,
//     "$2a$10$NMAH.b7efav11zSwf/k7F./FtQfnCg3d/3cO8O4cXc8vWNPmh6Ed6",
//     (err, resp) => {
//       console.log("res of bcrypt: ", resp);
//       console.log(typeof resp);
//       if (resp === true) {
//         console.log("setting success to true");
//         success = true;
//       }
//     }
//   );

app.listen(3000);
