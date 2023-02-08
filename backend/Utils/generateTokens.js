import jWt from "jsonwebtoken";

const generateToken = (id) => {
   return jWt.sign({id}, process.env.JWT_SECRET, {
        
        expiresIn: "30d",

   });
   
};

export default generateToken;