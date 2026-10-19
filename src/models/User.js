import bcrypt from "bcrypt"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true})

const user = mongoose.model("user",userSchema)
export default user