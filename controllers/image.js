const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "05222e75cf0f4543807d6282507f29ab",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      Clarifai.CELEBRITY_MODEL,
      // "https://samples.clarifai.com/celebrity.jpeg"
      req.body.input
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with Clarifai API"));
};

const handleImagePut = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImagePut: handleImagePut,
  handleApiCall: handleApiCall,
};
