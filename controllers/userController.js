import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token/jwtToken.js";
import sendEmail from "../utils/mail/mail.js";
import VerificationToken from "../models/verifyTokenModel.js";
import crypto from "crypto";
//import UserMetaData from "../models/userMetaData.js";

class UserClass {
  // user registration
  static async registerUser(req, res) {
    const { email, password, name } = req.body;

   try {
     if (!email || !password || !name) {
       res.status(400);
       const error = new Error("Please fill all the fields");
       throw error;
     }
     const lowerCaseEmail = email.toLowerCase();
 
     const existingUser = await User.findOne({ email: lowerCaseEmail });
 
     const hashedPassword = await bcrypt.hash(password, 8);
     // generate random token
     const generateRandomString = (length) => {
       return crypto
         .randomBytes(length)
         .toString("base64")
         .replace(/\+/g, "0")
         .replace(/\//g, "0")
         .replace(/=+$/, "");
     };
     const token = generateRandomString(20);
 
     const definerole = await Role.findOne({ role: "admin" });
 
     if (!existingUser) {
       const newUser = await User.create({
         email: lowerCaseEmail,
         role: definerole._id,
         password: hashedPassword,
         name,
       });
       await VerificationToken.create({
         token,
         userId: newUser._id,
         expiry: Date.now() + 3600000,
       });
 
       await sendEmail(name, email, token, "verification");
 
       return res
         .status(201)
         .json({ status: 201, message: "User Registered Successfully" });
     }
     const deletedUser = existingUser.isDeleted;
 
     if (existingUser && deletedUser) {
       existingUser.isDeleted = false;
       existingUser.password = hashedPassword;
       existingUser.role = definerole._id;
       existingUser.name = name;
       existingUser.isverified = false;
       await existingUser.save();
       const previousUserToken = await VerificationToken.findOne({
         userId: existingUser._id,
       });
 
       if (previousUserToken) {
         previousUserToken.token = token;
         previousUserToken.expiry = Date.now() + 3600000;
         await previousUserToken.save();
       } else {
         await VerificationToken.create({
           token,
           userId: existingUser._id,
           expiry: Date.now() + 3600000,
         });
       }
 
       return res
         .status(201)
         .json({ status: 201, message: "User Registered Successfully" });
     }
     const error = new Error("User Already Exists");
     res.status(409);
     throw error;
   } catch (error) {
     
     throw new Error(error);
    
   }
  }
  // user login
  static async loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Please fill all the fields");
      res.status(400);
      throw error;
    }
    const lowerCaseEmail = email.toLowerCase();
    const userExist = await User.findOne({ email: lowerCaseEmail });

    if (!userExist) {
      const error = new Error("User Does Not Exist");
      res.status(401);
      throw error;
    }
    const isverified = userExist.isverified;
    const isDeleted = userExist.isDeleted;
    const isactive = userExist.isactive;

    if (isDeleted) {
      const error = new Error("User Does Not Exist");
      res.status(401);
      throw error;
    }
    if (!isverified) {
      const error = new Error("please verify your email");
      res.status(403);
      throw error;
    }

    if (!isactive) {
      const error = new Error("Your account is not active");
      res.status(403);
      throw error;
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
      const error = new Error("Invalid Credentials");
      res.status(401);
      throw error;
    }

    const token = generateToken(userExist);
    const role = await Role.findById(userExist.role);
    if (!role) {
      const error = new Error("Role not found");
      res.status(401);
      throw error;
    }
    const user = {
      full_name: userExist.name,
      email: userExist.email,
      Id: userExist._id,
      role: role.role,
      role_id: role._id,
    };

    return res
      .status(200)
      .json({
        status: 200,
        message: "User Logged In Successfully",
        token,
        user,
      });
  }
  // user verification
  static async verifyController(req, res) {
    const { id } = req.params;

    const token = await VerificationToken.findOne({
      token: id,
    });
    const existUser = await User.findById(token.userId);
    if (!token) {
      res.status(400);
      throw new Error("invalid token");
    }
    if (existUser.isverified) {
      res.status(401);
      throw new Error("user already verified");
    }

    if (!existUser) {
      res.status(400);
      throw new Error("user not found");
    }
    existUser.isverified = true;
    await existUser.save();
    res
      .status(201)
      .json({ status: 201, message: "user verified successfully" });
  }

  // forgot password
  static async forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) {
      res.status(400);
      const error = new Error("Please enter the email");
      throw error;
    }
    const lowerCaseEmail = email.toLowerCase();
    const userExist = await User.findOne({ email: lowerCaseEmail });
    if (!userExist) {
      return res.status(401).json({ error: "User Does Not Exist" });
    }
    const generateRandomString = (length) => {
      return crypto
        .randomBytes(length)
        .toString("base64")
        .replace(/\+/g, "0")
        .replace(/\//g, "0")
        .replace(/=+$/, "");
    };
    const token = generateRandomString(20);

    const verifyTokenExist = await VerificationToken.findOne({
      userId: userExist._id,
    });
    if (verifyTokenExist) {
      verifyTokenExist.token = token;
      verifyTokenExist.expiry = Date.now() + 3600000;
      await verifyTokenExist.save();
    } else {
      await VerificationToken.create({
        token,
        userId: userExist._id,
        expiry: Date.now() + 3600000,
      });
    }
    await sendEmail(userExist.name, email, token, "reset-password");

    return res
      .status(200)
      .json({ status: 201, message: "Token Generated Successfully" });
  }

  // reset password
  static async resetPassword(req, res) {
    const { id } = req.params;

    const { password } = req.body;

    if (!password || !id) {
      res.status(400);
      const error = new Error("Please fill all the fields");
      throw error;
    }

    const verifyTokenExist = await VerificationToken.findOne({ token: id });

    if (!verifyTokenExist) {
      res.status(400);
      throw new Error("Invalid Token");
    }

    const userExist = await User.findOne({ _id: verifyTokenExist.userId });

    if (!userExist) {
      res.status(401);
      throw new Error("User Does Not Exist");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    userExist.password = hashedPassword;
    await userExist.save();
    verifyTokenExist.token = "";
    verifyTokenExist.expiry = Date.now();
    await verifyTokenExist.save();

    return res
      .status(200)
      .json({ status: 200, message: "Password Reset Successfully" });
  }
  // update user


static async updateUser(req,res){
  const userId = req.user;

  const UserExist=await User.findById(userId);
  if(!UserExist){
    res.status(400);
    throw new Error("User not found");
  }
  const {name,email}=req.body;
  if(name){
    UserExist.name=name;
  }
  if(email){
    UserExist.email=email;
  }
  await UserExist.save();

  return res.status(201).json({status:201,message:"User updated successfully"});

  
}
// delete user
static async deleteUser(req,res){
  const userId=req.user;
  const roleId=req.role;

  const roleExist=await Role.findById(roleId);

  if(roleExist.role!=="admin" && roleExist.role!=="superadmin"){
    res.status(401);
    throw new Error("You are not authorized to delete user");
  }
  const UserExist=await User.findById(userId);
  if(!UserExist){
    res.status(400);
    throw new Error("User not found");
  }
  UserExist.isDeleted=true;
  await UserExist.save();
  return res.status(200).json({status:200,message:"User deleted successfully"});

}
// add user metadata
static async addMetaData(req,res){
  const file=req.file;

  const user_id=req.user;
  try {
    const {phone,city,zip,street}=req.body;
    const userExist=await User.findById(user_id);
    if(!userExist){
      res.status(400);
      throw new Error("User not found");
    }
   const savedMetaData= await UserMetaData.create({
      user_id,
      phone,
      city,
      zip,
      street,
      profile_image:file.path
    });
    return res.status(201).json({status:201,message:"User metadata added successfully",data:savedMetaData});
  } catch (error) {
    res.status(400);
    throw new Error(error);
    
  }
}
// get user metadata
static async getMetaData(req,res){
  const user_id=req.user;
  try {
    const userExist=await User.findById(user_id);
    if(!userExist){
      res.status(400);
      throw new Error("User not found");
    }
    const metaData=await UserMetaData.findOne({user_id});
    if(!metaData){
      res.status(400);
      throw new Error("No data found");
    }
    const data = { ...metaData._doc, name: userExist.name,email:userExist.email };
    return res.status(200).json({status:200,data});
  } catch (error) {
    res.status(400);
    throw new Error(error);
    
  }

}
// update user metadata

static async updateMetaData(req, res) {
  const user_id = req.user;
  const file = req.file;

  try {
    let path = null; // Initialize as null

    if (file && file.path) {
      path = file.path;
    }

    const { phone, city, zip, street,fullName } = req.body;
    const userExist = await User.findById(user_id);
    if (!userExist) {
      return res.status(400).json({ error: "User not found" });
    }

    const metaData = await UserMetaData.findOne({ user_id });
    if (!metaData) {
      return res.status(400).json({ error: "No metadata found" });
    }
    if (fullName) {
      userExist.name = fullName;
      await userExist.save();
    }

    if (phone) {
      metaData.phone = phone;
    }
    if (city) {
      metaData.city = city;
    }
    if (zip) {
      metaData.zip = zip;
    }
    if (street) {
      metaData.street = street;
    }
    if (path) {
      metaData.profile_image = path;
    }

    await metaData.save();
    const metaDataWithName={...metaData._doc,name:userExist.name,email:userExist.email};
    return res.status(201).json({
      status: 201,
      message: "profile updated successfully",
      data: metaDataWithName,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



}

export default UserClass;
