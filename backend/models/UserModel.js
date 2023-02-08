import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(

    {
        firstName: {
            type: String,
            require: true,
        },
        middleName: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true,
        },
        phone: {
            type: Number,
            require: true,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        isAdmin: {
            type: Boolean,
            require: true,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);
// Login
userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}


// Register

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password  = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", userSchema);

export default User;