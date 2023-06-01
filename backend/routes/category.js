const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication");
const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory} = require("../controllers/category");
const {getUserById} = require("../controllers/user");


//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//Actual routers
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory); //for saving the new category in the DB

// Read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update route
router.put("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin, updateCategory);

//Delete route
router.delete("/category/:categoryId/:userId",isSignedIn, isAuthenticated, isAdmin, deleteCategory);


module.exports = router;