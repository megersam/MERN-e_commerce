import mongoose from "mongoose";


const reviewSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        rating: {
            type: Number,
            require: true,
        },
        Comment: {
            type: String,
            require: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User ",
        }
    }
);


const productSchema = mongoose.Schema(

    {
        productName: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,
            require: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            require: true,
            default: 0,
        },
        price: {
            type: Number,
            require: true,
        },
        countInStock: {
            type: Number,
            require: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
  
     const Product = mongoose.model("Product", productSchema);

     export default Product;