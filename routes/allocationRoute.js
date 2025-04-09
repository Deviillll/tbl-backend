import express from 'express';
import asyncHandler from 'express-async-handler';

import authMiddleware from '../middlewares/authMiddleware.js';
import AllocationController from '../controllers/allocationController.js';
const allocationRoute = express.Router();
allocationRoute.post('/allocation',authMiddleware, asyncHandler(AllocationController.createAllocation));


allocationRoute.get('/allocation',authMiddleware, asyncHandler(AllocationController.getAllocation));


export default allocationRoute;