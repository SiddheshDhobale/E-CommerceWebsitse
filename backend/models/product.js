const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:100
    },
    price:{
        type:Number,
        trim:true,
        maxlength:32,
        required:true
    },
    category:{
        type:ObjectId,
        ref:"Category", //pulling the Category schema here by reference
        required: true
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    }
},{timestamps: true });

module.exports = mongoose.model("Product",productSchema);