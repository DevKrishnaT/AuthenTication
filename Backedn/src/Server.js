import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import users from "./models/User.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

   if(!fullName){
    return res.json({message: "full name not present"})
   }
   if(!password){
     return res.json({message: "password name not present"})
   }
   if(!email){
    return res.json({message: "email name not present"})
   }

    const exist = await users.findOne({ email });

    if (exist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new users({
      fullName,
      email,
      password: hashPass,
    });

    await newUser.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server running on port 4000");
    });

  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
};

startServer();



