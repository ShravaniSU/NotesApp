const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/summarize', aiController.summarize);
router.post('/key-points', aiController.keyPoints);
router.post('/ask', aiController.askQuestion);

module.exports = router;