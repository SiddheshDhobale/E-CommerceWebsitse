const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {getUserById } = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/authentication");
const {getProductById ,createProduct,getProduct,photo,getAllUniqueCategories} = require("../controllers/product");

//params
router.param("userId",getUserById);
router.param("productId",getProductById);

//Actual routes
router.post("/product/create/:userId", isSignedIn,isAuthenticated,isAdmin, createProduct);

router.get("/product/:productId",getProduct);

router.get("/product/photo/:productId",photo); //Optional route for performance optimization

router.get("/product/categories",getAllUniqueCategories);

module.exports = router;