const axios = require('axios');
const User = require('../models/User');
const WeatherSearch = require('../models/WeatherSearch');

exports.searchWeather = async (req, res) => {
  try {
    const { city, country } = req.body;
    console.log("Received request:", { city, country });

    // Check if city and country are provided
    if (!city || !country) {
      return res.status(400).json({
        success: false,
        message: "City and country are required",
      });
    }

    // Verify API key
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      console.error("OpenWeatherMap API key is missing");
      return res.status(500).json({
        success: false,
        message: "Server configuration error: API key missing",
      });
    }

    // Fetch weather data from OpenWeatherMap API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
    let weatherResponse;
    try {
      weatherResponse = await axios.get(apiUrl);
      console.log("Weather API response:", weatherResponse.data);
    } catch (error) {
      console.error("Error fetching weather data:", error.response?.data || error.message);
      let errorMessage = "Failed to fetch weather data";
      if (error.response?.status === 401) {
        errorMessage = "Unauthorized: Invalid API key or plan limit reached";
      } else if (error.response?.status === 404) {
        errorMessage = "City/country not found";
      }
      return res.status(error.response?.status || 500).json({
        success: false,
        message: errorMessage,
      });
    }

    // Check if the response is valid
    if (!weatherResponse || !weatherResponse.data) {
      return res.status(404).json({
        success: false,
        message: "Weather data not found",
      });
    }

    // Get user ID from auth middleware
    const userId = req.user.userId;
    console.log("User ID:", userId);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const weatherData = weatherResponse.data;

    // Save to WeatherSearch model
    const weatherSearch = await WeatherSearch.create({
      user: userId,
      city: city,
      country: country,
      response: weatherData,
      searchedAt: new Date(),
    });
    console.log("Saved to WeatherSearch:", weatherSearch);

    // Add to User's searches array (without country, as per schema)
    // Add to User's searches array
const updatedUser = await User.findByIdAndUpdate(
  userId,
  {
    $push: {
      searches: {
        city: city,
        country: country, // Now included in the schema
        response: weatherData,
        searchedAt: new Date(),
      },
    },
  },
  { new: true }
);
console.log("Updated User searches:", updatedUser.searches);
    console.log("Updated User searches:", updatedUser.searches);

    // Return success response
    res.status(200).json({
      success: true,
      message: "Weather data fetched successfully",
      data: weatherData,
    });
  } catch (error) {
    console.error("Error during weather search:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getUserSearches = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Fetching searches for user ID:", userId);
    if (!userId) {
      console.log("User ID not found in request");
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("User searches:", user.searches);
    res.status(200).json({
      success: true,
      data: user.searches || [],
    });
  } catch (error) {
    console.error("Error fetching user searches:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};