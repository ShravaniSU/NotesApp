const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.post('/summarize', aiController.summarize);
router.post('/key-points', aiController.keyPoints);
router.post('/ask', aiController.askQuestion);

module.exports = router;