const User = require('../models/user')
const { check, validationResult, body } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");


//signUp Controller
exports.signUp = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const newUser = new User(req.body);// the user info from the json is getting here in the newUser object.
    newUser.save((err, user) => { //This will save the user in DB and will return the err if any and the saved user as of now
        if (err) {
            return res.status(400).json({
                errorMessage: "NOT able to SignUp"//If there is any error it will return error code and the message
            })
        }
        else {
            return res.json(user); //If the user gets saved it will return the user 
        }
    });
}


//Login Controller
exports.logIn = (req, res) => {
    const { email, password } = req.body; //Taking and destructuring the email and password typed by user

    const errors = validationResult(req);
    if (!errors.isEmpty()) //validating the errors 
    {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    //Fiding the user with email from DB //NOT Working yet because of Error in findOne
    User.findOne({email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User do NOT Exists"
            })
        }

        //If the user exists then authenticate it from the authenticate method from the user model
        if (user.autheticate(password)) {
            return res.status(401).json({
                error: "Email and Password Do NOT Match"
            })
        }

        //create token
        var token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //send response to frontend
        const { _id, email, name, role } = user;
        return res.json({
            token,
            user: { _id, email, name, role }
        })

    })

}

//protected Routes
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "authentication" 
})


//Custom Middleware
exports.isAuthenticated = (req, res, next)=>{
    let checker = req.profile && req.authentication && req.profile._id == req.authentication._id
    if(!checker)
    {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}


exports.isAdmin = (req, res, next)=>{
    if(req.profile.role === 0)
    {
        return res.status(403).json({
            error: "This user is not ADMIN"
        });
    }
    next();
}

//signOut Controller
exports.signOut = (req, res) => {
    res.clearCookie("token");
    return res.json({
        message: "User is Signed Out"
    });
}