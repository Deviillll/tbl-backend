import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    creditHours:{
        type: Number,
        required: true
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
const Course = mongoose.model('tbl_course', courseSchema);

export default Course;