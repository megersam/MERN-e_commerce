import express from "express";
import products from "./data/Products.js";
import dotenv from "dotenv" 
import connectDatabase from "./config/mongodb.js";
import ImportData from "./DataImports.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notfound } from "./Middleware/Errors.js";
import userRoute from "./Routes/UserRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

// Error Handler  
app.use(notfound);
app.use(errorHandler);
// Load product from data folder backend part.
 

 

const PORT = process.env.PORT || 5000;
 
app.listen(PORT, console.log(`server running on port ${PORT}`))