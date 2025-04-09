import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    instituteId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institute',
        required: true
    },
    departmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    phone:{
        type: String,
        required: true
    },
});
const Teacher = mongoose.model('tbl_teacher', teacherSchema);

export default Teacher;