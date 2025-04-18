
import mongoose from "mongoose";
const classSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    departmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    instituteId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institute',
        required: true
    },
});
const ClassModel = mongoose.model('tbl_class', classSchema);
export default ClassModel;



