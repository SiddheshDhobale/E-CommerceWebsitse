const User = require("../models/user");
const Category = require("../models/category");

//Middleware
exports.getCategoryById=(req, res, next, id)=>{ 
    Category.findById(id).exec((error,cate)=>{
        if(error || !cate)
        {
            return res.status(404).json({
                error: "Category NOT Found!"
            })
        }
        req.category = cate;
        next();
    });
}

//Save the new category in DB
exports.createCategory=(req, res)=>{
    const newCategory = new Category(req.body);
    newCategory.save((error, category)=>{
        if(error)
        {
            return res.status(500).json({
                error: "Cannot perform this request!"
            })
        }
        return res.json({category});
    })
}

//
exports.getCategory = (req, res)=>{

    return res.json(req.category);
}

exports.getAllCategory = (req, res)=>{

    Category.find().exec((error, categories)=>{
        if(error)
        {
            return res.status(404).json({
                error: "Categories NOT Found!"
            })
        }
        return res.json({categories});
    })
}

//Update the Category
exports.updateCategory=(req, res)=>{
    const category = req.category;
    category.name = req.body.name;
    
    category.save((error, updatedCategory)=>{
        if(error)
        {
            return res.status(404).json({
                error:"Failed to Update!"
            })
        }
        res.json(updatedCategory);
    })

}

exports.deleteCategory= (req, res) =>{
    const category = req.category;
    category.remove((error, category)=>{
        if(error)
        {
            return res.status(400).json({
                error:"Can NOT remove Category"
            })
        }
        return res.json({
            message:"Successfully Deleted!"
        })
    })
}