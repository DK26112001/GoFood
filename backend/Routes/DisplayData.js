const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    res.json({ GoFood: global.GoFood, samplefood: global.samplefood });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
