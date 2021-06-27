const express = require('express');
const { list, create } = require('../controllers/invoice');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, list);
router.post('/', protect, create);

module.exports = router;