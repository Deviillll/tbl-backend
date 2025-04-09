import mongoose from "mongoose";
const timeSchema = new mongoose.Schema({
    instituteId: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },

});
const Time = mongoose.model("tbl_time", timeSchema);
export default Time;