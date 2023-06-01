const User = require("../models/user");
const Product = require("../models/product");
const {productsCart,orders} = require("../models/order");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); //By default library of node

exports.getOrderById=(req,res,next, id)=>{
    orders.findById(id)
    .populate("products.product","name price") //product will be done with frontend here
    .exec((error, order)=>{
        if(error)   
        {
            return res.status(404).json({
                error:"Order Not Found!"
            })
        }
        req.order = order;
        next();
    })
}


exports.createOrder=(req,res)=>{
    req.body.order.user = req.profile
    const order = new orders(req.body.order);
    order.save((error,order)=>{
        if(error)
        {
            return res.status(400).json({
                error:"Failed to Save Order!"
            })
        }
        res.json(order);
    })
}

exports.getAllOrders=(req,res,)=>{
    orders.find()
          .populate("user","_id name")
          .exec((error, order)=>{
            if(error)
            {
                return res.status(400).json({
                    error:"Orders not Found!"
                })
            }
                res.json(order);
          })
}

exports.getOrderStatus=(req,res)=>{
    res.json(orders.schema.path("status").enumValues);
}

exports.updateStatus=(req,res)=>{
    orders.updateOne(
        {_id:req.body.orderId}, // getting the order Id from the frontend
        {$set:{status:req.body.status}}, // set the status
        (error, order)=>{
            if(error)
            {
                return res.status(404).json({
                    error:"Order Not Found!"
                })
            }
            res.json(order);
        }

    )
}