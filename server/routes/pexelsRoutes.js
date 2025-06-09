// routes/pexelsRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/image', async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.PEXELS_API_KEY;

  try {
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(city)} city&per_page=1`, {
      headers: {
        Authorization: apiKey,
      },
    });

    const photo = response.data.photos[0]?.src?.large;
    res.json({ success: true, imageUrl: photo });
  } catch (error) {
    console.error("Pexels fetch error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch image" });
  }
});

module.exports = router;
