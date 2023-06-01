const express = require("express");
const router = express.Router();
const { signOut, signUp ,logIn, isSignedIn } = require("../controllers/authentication.js");
const { check, validationResult } = require('express-validator');


router.post("/signup",  [
    check('name').isLength({ min: 3 }).withMessage('Name must contain atleast 3 chracters'),
    check('lastname').isLength({ min: 3 }).withMessage('Last Name must contain atleast 3 chracters'),
    check('email').isEmail().withMessage('Inappropriate Email'),
    check('password').isLength({ min: 5 }).withMessage('Password must be minimum of 5 characters'),
],signUp);


router.post("/login",  [
    check('email').isEmail().withMessage('Incorrect Email'),
    check('password').isLength({ min: 5 }).withMessage('Incorrect Password'),
],logIn);


router.get("/signout", signOut);

router.get("/testroute",isSignedIn,(req, res)=>{
    res.json(req.authentication)
})

module.exports = router;