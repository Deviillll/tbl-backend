import mongoose from "mongoose";
// user schema
const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
      
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role"
    },isDeleted:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        required:true
        
    },
    isverified:{
        type:Boolean,
        default:false
    },
    isactive:{
        type:Boolean,
        default:true
    }
    

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("tbl_user", userSchema);
export default User;