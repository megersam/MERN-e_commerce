import express from "express";
import User from "./models/UserModel.js"; 
import users from "./data/users.js";
import products from "./data/Products.js";
import Product from "./models/ProductModel.js";
import asyncHandler from "express-async-handler";


const ImportData = express.Router();

ImportData.post("/users", asyncHandler(async (req, res)=>{
    await User.remove({});
    const ImportUser = await User.insertMany(users);
    res.send({ ImportUser });
}
));

ImportData.post("/product", asyncHandler(async (req, res)=>{
    await Product.remove({});
    const ImportProduct = await Product.insertMany(products);
    res.send({ ImportProduct });
}
));

export default ImportData;