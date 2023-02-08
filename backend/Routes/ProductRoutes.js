import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';


 const productRoute = express.Router();

// get all products from the mongo db
 productRoute.get(
    "/",
    asyncHandler(async (req,res) =>{
        const products = await Product.find({});
        res.json(products)
    })
 );
 

//  get products from mongo db by id
productRoute.get(
    "/:id",
    asyncHandler(async (req,res) =>{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product)
        }else{
           res.status(404);
           throw new Error("product Not Found");
        }
    })
 );

 export default productRoute;


