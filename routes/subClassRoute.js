import express from 'express';
import asyncHandler from 'express-async-handler';

import authMiddleware from '../middlewares/authMiddleware.js';

import SubClassController from '../controllers/subClassController.js';

const subClassRoute = express.Router();

subClassRoute.post('/subClass',authMiddleware, asyncHandler(SubClassController.createSubClass));

export default subClassRoute;