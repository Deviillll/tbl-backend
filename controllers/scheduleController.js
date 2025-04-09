import Schedule from "../models/scheduleModel.js";

class ScheduleController {

    static async createSchedule(req, res) {
        try {
            const { instituteId, departmentId, start, end, date ,day,duration,isActive} = req.body;

            if (!instituteId  || !start || !end || !duration ) {
                res.status(400)
                throw new Error("All fields are required");
            }
            if (duration === "weekly" && !day) {
                res.status(400)
                throw new Error("Day is required for weekly duration");
            }
            if (duration === "custom" && !date) {
                res.status(400)
                throw new Error("At least one date is required for custom duration");
            }

            const schedule = new Schedule({
                instituteId,
                departmentId,
                start,
                end,
                date,
                day,
                duration,
                isActive
            });
            await schedule.save();

            res.status(201).json({
                status: "201",
                message: "Schedule created successfully",
                schedule
            });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    static async getSchedule(req, res) {
        try {
            const { instituteId,departmentId } = req.body;
            if (!instituteId) {
                res.status(400)
                throw new Error("Institute ID is required");
            }
            let schedule;

            if(departmentId) {
                schedule = await Schedule.find({ instituteId, departmentId });
                if (!schedule) {
                    res.status(404)
                    throw new Error("Schedule not found for this department");
                }
            }else{

                schedule = await Schedule.find({ instituteId });
            }


            if (!schedule) {
                res.status(404)
                throw new Error("Schedule not found");
            }
            res.status(200).json({
                status: "200",
                message: "Schedule fetched successfully",
                schedule
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

}
export default  ScheduleController