import express from "express";
import asyncHandler from 'express-async-handler';
import Department from '../controllers/departmentController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const departmentRoute = express.Router();

departmentRoute.post('/department',authMiddleware, asyncHandler(Department.createDepartment));
departmentRoute.get('/department',authMiddleware, asyncHandler(Department.getDepartments));
export default departmentRoute;