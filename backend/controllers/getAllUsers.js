const User = require('../models/user')

exports.getAllUsers = (req, res)=>{
    User.find().exec((error, users)=>{
        if(error || !users)
        {   
            return res.status(400).json({
                error: "BAD REQUEST"
            })
        }
        res.json(users);
    })
}   