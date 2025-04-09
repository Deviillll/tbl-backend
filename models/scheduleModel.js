import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "institute",
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    start: { type: String, required: true, default: "00:00" }, // e.g., "09:00"
    end: { type: String, required: true, default: "00:00" }, // e.g., "17:00"
    day: { type: String, default: null }, // optional, e.g., "Monday"
    isActive: { type: Boolean, default: true },
    duration: {
      type: String,
      required: true,
      enum: ["weekly", "custom"],
      default: null,
    },
    date: { type: Date, default: "" }, // Array of dates for special days
  },
  {
    validateBeforeSave: true,
  }
);

// Custom validation logic
scheduleSchema.pre("save", function (next) {
  if (this.duration === "custom" && this.date === "") {
    return next(new Error("At least one date is required for custom duration"));
  }
  if (this.duration === "weekly" && this.day === "") {
    return next(new Error("Day is required for weekly duration"));
  }
  next();
});

const Schedule = mongoose.model("tbl_schedule", scheduleSchema);

export default Schedule;
