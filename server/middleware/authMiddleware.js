// const jwt= require("jsonwebtoken");
// const dotenv= require("dotenv");
// const User= require("../models/User");
// // Configuring dotenv to load environment variables from .env file
// dotenv.config();
// // This function is used as middleware to authenticate user requests
// exports.auth = async (req, res, next) => {
//   try {
//     console.log("Auth middleware called");
//     let token = (req.cookies && req.cookies.token) || req.body.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
    
//     if (!token) {
//       console.log("No token found!");
//       return res.status(401).json({ success: false, message: `Token Missing` });
//     }

//     try {
//       const decode = await jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decode;
//       console.log("Decoded user in auth:", decode);
//     } catch (error) {
//       console.log("JWT verification error:", error.message);
//       return res.status(401).json({ success: false, message: "token is invalid" });
//     }

//     next();
//   } catch (error) {
//     console.log("General auth middleware error:", error.message);
//     return res.status(401).json({ success: false, message: `Something Went Wrong While Validating the Token` });
//   }
// };

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    console.log("Auth middleware called");

    let token = req.cookies?.token || req.body?.token || req.header("Authorization")?.replace("Bearer ", "");


    if (!token) {
      console.log("No token found!");
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log("✅ Decoded user:", decode);
    } catch (error) {
      console.log("❌ JWT verification error:", error.message);
      return res.status(401).json({ success: false, message: "Token is invalid or expired" });
    }

    next();
  } catch (error) {
    console.log("❌ General auth middleware error:", error.message);
    return res.status(401).json({ success: false, message: `Something went wrong while validating the token` });
  }
};
