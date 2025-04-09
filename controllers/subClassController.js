import SubClass from "../models/subClassModel.js";

class SubClassController{

    static async createSubClass(req, res) {
        try {
            const { instituteId, classId,subClassName } = req.body;

            if (!instituteId || !classId || !subClassName) {
                 res.status(400)
                 throw new Error("All fields are required");
            }

            const subClass = new SubClass({
                instituteId,
                classId,
                name:subClassName
            });
            await subClass.save();
            
            res.status(201).json({
                status: "201",
                message: "SubClass created successfully",
                subClass
            });
            
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

}
export default SubClassController;