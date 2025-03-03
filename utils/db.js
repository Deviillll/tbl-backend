import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
// import mongoose from "mongoose";

// const connectDb = async () => {
//   const connection = mongoose.connection;

//   try {
//     // Verify the URI
//     await mongoose.connect(process.env.MONGO_URI || "", {
//       useNewUrlParser: true,
//     });
//   } catch (error) {
//     process.exit(1);
//   }
// };
// export default connectDb;
