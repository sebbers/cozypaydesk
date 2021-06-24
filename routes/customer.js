const express = require('express');
const { create, list } = require('../controllers/customer');
const {protect} = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, create);
// router.post('/login', login);
router.get('/', protect, list);

//Sample route with authorization example for roles.
//router.get('/me', protect, authorize('admin', 'user'),anySecureOperation);

module.exports = router;