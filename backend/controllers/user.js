const User = require("../models/user");
const Order = require("../models/order");

//To get the user by its id in this middleware 
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: "This user Does Not Exist"
            })
        }

        req.profile = user;
        next();
    })
}

//To get the user with password 
exports.getUser = (req, res) => {

    req.profile.salt = undefined; //to make the salt not visible on the profile
    req.profile.encry_password = undefined; //same like above line
    return res.json(req.profile);
}

// exports.getAllUsers = (req, res)=>{
//     User.find().exec((error, users)=>{
//         if(error || !users)
//         {   
//             return res.status(400).json({
//                 error: "BAD REQUEST"
//             })
//         }
//         res.json(users);
//     })
// }   

//Update User controller:
exports.updateUser=(req, res)=>{

    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body}, //This will set the values from the req.body from frontend to the object
        {new:true,useFindAndModify:false},
        (error, user)=> {
            if(error || !user)
            {
                return res.status(400).json({
                    error: "USER NOT FOUND!"
                });
            }
            user.salt = undefined; //to make the salt not visible on the profile
            user.encry_password = undefined;
            return res.json(user);
        }
    )
}

//User Orders/Purchase List controller
exports.userPurchaseList=( req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((error, orders)=>{
        if(error || !orders)
        {
            return res.status(204).json({
                error: "CART IS EMPTY"
            })
        }
        return res.json(orders)
    })
}

//middleware for pushing the orders from user in the purchaseList array
exports.pushOrdersInPurchaseList=(req, res, next)=>{

    let purchases = [];
    req.body.orders.products.forEach(product=>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.orders.amount,
            transaction_id: req.body.orders.transaction_id,
        })
    })

    next();
}