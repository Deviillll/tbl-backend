import express from 'express';
import asyncHandler from 'express-async-handler';

import authMiddleware from '../middlewares/authMiddleware.js';
const classRoute = express.Router();

import ClassController from '../controllers/ClassController.js';
classRoute.post('/class',authMiddleware, asyncHandler(ClassController.create));
classRoute.get('/classes',authMiddleware, asyncHandler(ClassController.getClasses));

export default classRoute;

