import mongoose from "mongoose";
const verifyTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    expiry: {
        type: Date,
        required: true,
    },
    });
    const VerificationToken = mongoose.models.VerifyToken || mongoose.model("tbl_verifyToken", verifyTokenSchema);
    export default VerificationToken;