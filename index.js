import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import connectDb from "./utils/db.js";
import errorHandler from "./middlewares/errorHnadlerMiddleware.js";

dotenv.config();


connectDb()


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// routes 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 
app.use(errorHandler);
