import mongoose from "mongoose";
const resolverSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    institute_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CompanyProfile",
        required: true
    },
    }, {
    timestamps: true
    });
const Resolver = mongoose.model("tbl_resolver", resolverSchema);
export default Resolver;