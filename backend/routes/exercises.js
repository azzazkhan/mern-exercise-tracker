const router = require("express").Router();
let Exercise = require("../models/exercise");

// Get a list of all exercises
router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Add new exercise to database
router.route("/add").post((req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  new Exercise({ username, description, duration, date })
    .save()
    .then(() => res.json("Exercise added successfully!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Retrieve record for single exercise
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Delete specified exercise
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted successfully!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Update specified exercise with provided data
router.route("/:id/update").post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json(exercise))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
