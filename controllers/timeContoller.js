import Time from "../models/timeModel.js";

class TimeClass{
    static async createTime(req, res) {
        try {
            const { instituteId,start, end } = req.body;
            if (!instituteId || !start || !end) {
                 res.status(400)
                 throw new Error("All fields are required");
            }

            const time = new Time({
                instituteId,
                start,
                end
            });
            await time.save();
            res.status(201).json({
                status: "201",
                message: "Time created successfully",
                time
            });
            
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }


    static async getTimes(req, res) {
        try {
            const times = await Time.find({});
            res.status(200).json({
                status: "200",
                message: "Times fetched successfully",
                times
            });
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
export default TimeClass;