
import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
    roomName:{
        type: String,
        required: true
    },
    capacity:{
        type: Number,
    
    },
    departmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    isActive:{
        type: Boolean,
        default: true
    },
    instituteId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institute',
        required: true
    },
});
const Room = mongoose.model('tbl_room', roomSchema);
export default Room;