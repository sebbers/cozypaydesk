const express = require('express');
const { list } = require('../controllers/invoice');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, list);

module.exports = router;