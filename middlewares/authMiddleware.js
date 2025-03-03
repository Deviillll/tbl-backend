import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error(
      "Access denied. No token provided or invalid format."
    );
    res.status(401);
    throw error;
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Access denied. No token provided.");
    res.status(401);
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded._id;
    req.role = decoded.role;
    

    next();
  } catch (ex) {
    res.status(400);
    throw new Error(ex);
  }
});

export default authMiddleware;
