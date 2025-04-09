import express from 'express';

import asyncHandler from 'express-async-handler';
import InstituteController from '../controllers/instituteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';


const instituteRoute = express.Router();

instituteRoute.post('/institute',authMiddleware,upload, asyncHandler(InstituteController.create) );

export default instituteRoute;