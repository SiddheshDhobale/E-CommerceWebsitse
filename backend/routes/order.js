const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {getUserById , userPurchaseList, pushOrdersInPurchaseList} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication");
const{updateStock}= require("../controllers/product")
const{getOrderById, getAllOrders ,createOrder,getOrderStatus, updateStatus}= require("../controllers/order");

//params
router.param("userId",getUserById);
router.param("orderId",getOrderById);

//Actual routes
//create routes
router.post("/order/create/:userId",isSignedIn, isAuthenticated, pushOrdersInPurchaseList, updateStock , createOrder)

//read routes
router.get("/order/all/:userId",isSignedIn, isAuthenticated, isAdmin, getAllOrders);

//update the orders
router.get("/order/status/:userId",isSignedIn,isAuthenticated, isAdmin,getOrderStatus);
router.put("/order/:orderId/:status/:userId",isSignedIn,isAuthenticated, isAdmin, updateStatus); //for admin only to update the status


module.exports = router;