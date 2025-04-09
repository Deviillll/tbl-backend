import express from "express";
import asyncHandler from 'express-async-handler';
import ScheduleController from "../controllers/scheduleController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const scheduleRoute = express.Router();

scheduleRoute.post("/schedule", authMiddleware, asyncHandler(ScheduleController.createSchedule));
scheduleRoute.get("/schedule", authMiddleware, asyncHandler(ScheduleController.getSchedule));

export default scheduleRoute;