require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');


const PORT = process.env.PORT || 4000;
const connectDB = require('./config/dbConn');

// Connect to MongoDB
connectDB();

// express app
const app = express()

// middleware
// It's like a helper function that intercepts and handles an HTTP request before it reaches the route handler
app.use(express.json()) // it passes the body(data) to the req object [then we can use req.body]
app.use((req, res, next) => {
    console.log( "Path>> "+ req.path, "Method>> "+req.method);
    next()
})

// routes
app.use('/api/workouts', workoutRoutes) // so we use workoutRoutes which is inside the workouts.js for /api/workouts
app.use('/api/user', userRoutes)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

