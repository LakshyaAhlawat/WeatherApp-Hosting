const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// signup controller for registering users
exports.signup=async (req,res)=>{
  try{
    const {email, username, password} = req.body;
    // Check if all fields are provided
    if(!email || !username || !password){
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // cehck if user already exists
    const existingUser = await User.findOne({ $or: [ { email }, { username } ] });
    if(existingUser){
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user=await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Generate JWT token
    const token=jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    )

    // return success response
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      token,
      message: "User registered successfully",
    });
  }
  catch(error){
    console.error("Error during signup:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Login controller for authenticating users
exports.login=async(req,res)=>{
  try{
    const {email, password}=req.body;
    // Check if email and password are provided
    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    // Find user by email
    const user=await User.findOne({email});
    // If user not found
    if(!user){
      return res.status(401).json({
        success: false,
        message: "User not found. Please register.",
      });
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // If password is invalid
    if(!isPasswordValid){
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    // Generate JWT token
    const token=jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    );

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      token,
      message: "Login successful",
    });
  }
  catch(error){
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}