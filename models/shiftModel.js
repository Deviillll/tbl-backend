import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
    shiftName: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },

    instituteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institute",
        required: true,
    },

});

const Shift = mongoose.model("tbl_shift", shiftSchema);

export default Shift;
