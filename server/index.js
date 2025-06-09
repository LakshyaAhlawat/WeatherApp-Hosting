const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const pexelsRoutes = require('./routes/pexelsRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());      // To parse JSON body

app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded body
app.use(cookieParser());      // To parse cookies


// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/pexels', pexelsRoutes);


// Default route
app.get('/', (req, res) => {
  res.send('WeatherWise API is running');
});

// Error handling middleware (optional, if you have one)
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});