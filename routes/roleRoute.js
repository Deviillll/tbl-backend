import express from 'express';
import roleController from '../controllers/roleController.js';
import asyncHandler from 'express-async-handler';


const roleRoute = express.Router();

roleRoute.post('/role', asyncHandler(roleController) );

export default roleRoute;