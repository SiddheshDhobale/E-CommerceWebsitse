const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {getUserById, getUser,getAllUsers,updateUser,userPurchaseList} = require('../controllers/user');
const {isSignedIn, isAuthenticated, isAdmin } = require('../controllers/authentication');

//Params for UserId
router.param("UserId",getUserById);

router.get("/User/:UserId",isSignedIn,isAuthenticated, getUser);

// router.get("/getAllUsers",getAllUsers);

//Update Request
router.put("/User/:UserId",isSignedIn,isAuthenticated, updateUser);

//userPurchaseList request
router.get("/orders/User/:UserId",isSignedIn,isAuthenticated, userPurchaseList)










module.exports = router;