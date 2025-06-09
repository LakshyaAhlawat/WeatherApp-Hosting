const express = require('express');
const router = express.Router();
const { searchWeather, getUserSearches } = require('../controllers/weatherController');
const {auth} = require('../middleware/authMiddleware');

router.post('/search', auth, searchWeather);
router.get('/user/searches', auth, getUserSearches);

module.exports = router;