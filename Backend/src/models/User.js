import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String 
});

const users = mongoose.model("users" , userSchema);

export default users;
