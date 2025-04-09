import express from "express";
import roomController from "../controllers/roomController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import asyncHhandler from "express-async-handler";

const roomRoute = express.Router();

roomRoute.post("/room", authMiddleware, asyncHhandler(roomController.createRoom));
roomRoute.get("/room", authMiddleware, asyncHhandler(roomController.getRooms));

export default roomRoute;