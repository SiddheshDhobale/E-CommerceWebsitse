const express = require('express');
const router = express.Router();
const User = require('../models/user');

const {getAllUsers} = require('../controllers/getAllUsers');
router.get("/getAllUsers",getAllUsers);

module.exports = router;