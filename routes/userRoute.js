import express from 'express';
import asyncHandler from 'express-async-handler';
import UserClass from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';



const userRoute = express.Router();

userRoute.post('/register', asyncHandler(UserClass.registerUser)); 
userRoute.post('/login', asyncHandler(UserClass.loginUser));
userRoute.get("/verification/:id", asyncHandler(UserClass.verifyController)); 
userRoute.post('/forgotpassword', asyncHandler(UserClass.forgotPassword));
userRoute.post('/resetpassword/:id', asyncHandler(UserClass.resetPassword));
userRoute.patch('/update-user', authMiddleware, asyncHandler(UserClass.updateUser));
//userRoute.post('/add-employee',authMiddleware, asyncHandler(Company.addEmployee));
userRoute.post('/meta-data',authMiddleware,upload, asyncHandler(UserClass.addMetaData));
userRoute.get('/meta-data',authMiddleware, asyncHandler(UserClass.getMetaData));
userRoute.patch('/meta-data',authMiddleware,upload, asyncHandler(UserClass.updateMetaData));



export default userRoute;