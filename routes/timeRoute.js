import express from 'express';
import asyncHandler from 'express-async-handler';

import authMiddleware from '../middlewares/authMiddleware.js';
import TimeClass from '../controllers/timeContoller.js';

const timeRoute = express.Router();

timeRoute.post("/time",authMiddleware, asyncHandler(TimeClass.createTime));
timeRoute.get("/time",authMiddleware, asyncHandler(TimeClass.getTimes));
export default timeRoute;