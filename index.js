import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import connectDb from "./utils/db.js";
import errorHandler from "./middlewares/errorHnadlerMiddleware.js";
import roleRoute from "./routes/roleRoute.js";
import userRoute from "./routes/userRoute.js";
import instituteRoute from "./routes/instituteRoute.js";
import shiftRoute from "./routes/shiftRoute.js";
import departmentRoute from "./routes/departmentRoute.js";
import teacherRoute from "./routes/teacherRoute.js";
import courseRoute from "./routes/courseRoute.js";
import roomRoute from "./routes/roomRoute.js";
import timeRoute from "./routes/timeRoute.js";
import subClassRoute from "./routes/subClassRoute.js";
import classRoute from "./routes/classRoute.js";
import scheduleRoute from "./routes/scheduleRoute.js";
import allocationRoute from "./routes/allocationRoute.js";

dotenv.config();


connectDb()


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// routes 
app.use("/", roleRoute);
app.use("/", userRoute);
app.use("/", instituteRoute);
app.use("/", shiftRoute);
app.use("/", departmentRoute);
app.use("/", teacherRoute);
app.use("/", courseRoute);
app.use("/", roomRoute);
app.use("/", timeRoute);
app.use("/", classRoute);
app.use("/", subClassRoute);
app.use("/",scheduleRoute);
app.use("/", allocationRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 
app.use(errorHandler);
