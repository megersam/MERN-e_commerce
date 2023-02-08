import express from "express";
import asyncHandler from "express-async-handler"; 
import protect from "../Middleware/AuthMiddleware.js";
import User from "../models/UserModel.js";
import generateToken from "../Utils/generateTokens.js";

const userRoute = express.Router();

// Login

userRoute.post(
    "/login",
    asyncHandler(async (req, res) =>{
        const { email,  password} = req.body;
        const user = await User.findOne({ email });

        if(user && (await user.matchPassword(password)))
        {
             res.json({
                _id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,

             });
        }
        else 
        {
            res.status(401);
            throw new Error("Invalid Email and Password");
        }

    })
);

// Register New User.
userRoute.post(
    "/register",
    asyncHandler(async (req, res)=>{
        const {
            firstName,
            middleName,
            lastName,
            phone,
            email,
            password,
            
        } = req.body;
        
        const userEmailExists = await User.findOne({ email});
        const userPhoneExists = await User.findOne({phone});
        if (userEmailExists) {
            res.status(400);
            throw new Error("User already exists with this email");
        }

        if (userPhoneExists) {
            res.status(404);
            throw new Error("User already exists with this phone");
        }
        const user = await User.create({
            firstName,
            middleName,
            lastName,
            phone,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id), 
            });
        }
    })
); 

// User Profile fetch API.
userRoute.get(
    "/profile",
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)

        if (user) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin, 
                createdAt: user.createdAt,

            })
        } else {
            res.status(404);
            throw new Error("User Not Found")
        }
    })
);

// update user profile.
userRoute.put(
    "/profile",
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)

        if (user) {
            user.firstName = req.body.firstName || user.firstName
            user.middleName = req.body.middleName || user.middleName
            user.lastName = req.body.lastName || user.lastName
            user.phone = req.body.phone || user.phone
            user.email = req.body.email || user.email

            if (req.body.password) {
                user.password = req.body.password
            }
            const updatedUser = await user.save(); 
            res.json({
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                middleName: updatedUser.middleName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                createdAt: updatedUser.createdAt,
                token: generateToken(updatedUser._id),  
            })
        } else {
            res.status(404);
            throw new Error("User Not Found")
        }
    })
);

export default userRoute; 