import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import users from "./models/User.js";
import jwt from "jsonwebtoken";


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

//// get login

app.post('/login' , async (req , res)=>{
  try {
    const {email , password} = req.body;

    if(!email || !password){
      return res.status(400).json({ message: "Email and password required" });

    }

    const user = await users.findOne({email});


    if(!user){
      return res.status(404).json({message: "Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password , user.password);


    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
     {id: user._id},
     process.env.JWT_SECRET,
     {expiresIn: "1d"}
    )

     res.json({
      message: "Login successful",
      token
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})



///// medle wair


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};



app.get("/profile", verifyToken, async (req, res) => {
  const user = await users.findById(req.user.id).select("-password");
  res.json(user);
});



app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
};

startServer();



