const express = require('express');

const router = express.Router();

// Kanji-related routes
router.get('/', (req, res) => {
  res.send('List of Kanji');
});

// Additional routes

module.exports = router;
