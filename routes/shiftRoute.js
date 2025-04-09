import express from 'express';
import asyncHandler from 'express-async-handler';
import ShiftController from '../controllers/shiftController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const shiftRoute = express.Router();

shiftRoute.post('/shift',authMiddleware, asyncHandler(ShiftController.createShift));

export default shiftRoute;