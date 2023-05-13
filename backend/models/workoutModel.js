const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true }) // when created and when updated

module.exports = mongoose.model('Workout', workoutSchema) // creates a model

// In other files: Workout.find() for examply

