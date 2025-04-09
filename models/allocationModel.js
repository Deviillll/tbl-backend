import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
    {
        instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_institute",
        required: true,
        },
        departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_department",
        default: null,
        },
        scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_schedule",
        required: true,
        },
        courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_course",
        required: true,
        },
        teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_teacher",
        required: true,
        },
        roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_room",
        required: true,
        },
        subClassId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_subClass",
        },
        sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_section",
        default: null,
        },
        classId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_class",
        required: true,
        },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
    );

    const Allocation = mongoose.model("tbl_allocation", allocationSchema);
    export default Allocation;