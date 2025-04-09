import express from "express";
import asyncHandler from 'express-async-handler';

import Course from '../controllers/courseController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const courseRoute = express.Router();

courseRoute.post('/course',authMiddleware, asyncHandler(Course.createCourse));
courseRoute.get('/course',authMiddleware, asyncHandler(Course.getCourses));
export default courseRoute;