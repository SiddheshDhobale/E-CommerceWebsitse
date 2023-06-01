const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productsInCartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },

})

const productsCart = mongoose.model("productInCart",productsInCartSchema);

const orderSchema = new mongoose.Schema({
    products:[productsInCartSchema],
    transaction_id:{},
    amount:{
        type:Number
    },
    address:{
        type:String,
        maxlength:100,
        required:true,
        trim:true
    },
    status:{
        type:String,
        default:"Placed",
        enum:["Placed","Shipped","Cancelled","Delivered"]
    },
    updated:Date,
    user:{
        ref:"User",
        type:ObjectId,
        required:true
    }
},{timestamps:true});

const orders=mongoose.model("Orders",orderSchema);

module.exports = {productsCart,orders};