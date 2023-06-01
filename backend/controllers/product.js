const User = require("../models/user");
const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); //By default library of node

exports.getProductById=(req, res, next, id)=>{
    Product.findById(id).exec((error, product)=>{
        if(error)
        {
            return res.status(404).json({
                error: "Product Not Found!"
            })
        }
        req.product = product;
        next();
    })
}


//create product by using the formidable, lodash and fs  
exports.createProduct=(req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse (req,(error, feilds, file)=>{
        if(error)
        {
            return res.status(400).json({
                error: "The image format is incorrect"
            })
        }


        //Destructuring
        const {name, description, price, category, stock} = feilds
        //Restriction on feilds
        if(
            !name || !description ||!price ||!category ||!stock
        ){
            return res.status(400).json({
                error:"Please include all feilds"
            })

        }
        

        //Getting the feilds
        let product = new Product(feilds);

        //handling the file
        if(file.photo)
        {
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error:"File size is too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //Saving the product in DB
        product.save((error, product)=>{
            if(error)
            {
                return res.status(404).json({
                    errror : "Error in saving the product"
                })
            }
            res.json(product);
        })

    })
} 


//This will give the product but photo will be undefined because of the large size to not load the photo in background
exports.getProduct=(req,res)=>{
    req.product.photo = undefined;
    res.json(req.product);
}

//middleware to load  the photo and work fast
exports.photo=(req,res,next)=>{
    if(req.product.photo.data)
    {
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

//
exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(error,category)=>{
        if(error)
        {
            return res.status(404).json({
                error:"No categories found!"
            })
        }
        res.json(category);
    })
}


//Update Stock
exports.updateStock=(req,res,next)=>{

    let stockOperations = req.body.order.products.map=(prod=>{
        return{
            filter:{_id:prod._id},
            update:{$inc:{stock:-prod.count, sold:+prod.count}} //count will be thrown up from frontend
        }
    })

    console.log(stockOperations);

    Product.bulkWrite(stockOperations,{},(error,products)=>{
        if(error)
        {
            return res.status(400).json({
                error:"Bad Request!"
            })
        }
        next();
    })
}