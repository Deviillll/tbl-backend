import asyncHandler from 'express-async-handler';
import express from 'express';
import Teacher from '../controllers/teacherController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const teacherRoute = express.Router();

teacherRoute.post('/teacher', authMiddleware, asyncHandler(Teacher.createTeacher));
teacherRoute.get('/teacher', authMiddleware, asyncHandler(Teacher.getTeachers));
export default teacherRoute;