const router = require("express").Router();
const Workout = require("../models/Workout");
const path = require("path");
const mongoose = require("mongoose");


// API Routes
router.get("/api/workouts", async (req, res) => {
    let workouts;
    try {
       workouts = await Workout.find({}).sort({"day": -1});
       res.send(workouts);
    } catch (err) {
        console.error(err);
    }
});

router.post("/api/workouts", async (req, res) => {
    try {
        let newWorkout = await Workout.create(req.body);
        console.log('New workout added!');
        res.send(newWorkout);
    } catch (err) {
        console.error(err);
    }
});

router.put("/api/workouts/:id", async (req, res) => {
    try {
        let newExercise = await Workout.updateOne(
            {_id: mongoose.ObjectId(req.params.id)},
            {$push: {
                exercises: req.body
            }}
        );
        console.log("Added exercise!");
        res.send(newExercise);
    } catch (err) {
        console.error(err);
    }
});

// router.get("/api/workouts/range", async (req, res) => {

// })

// HTML Routes
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
});

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/stats.html"));
});

module.exports = router;