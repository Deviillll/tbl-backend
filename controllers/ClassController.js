import ClassModel from "../models/classModel.js";

class classController{
    static async create(req, res) {
        try {
            const { instituteId, name,departmentId } = req.body;
           if(!instituteId || !name || !departmentId){
               res.status(400)
               throw new Error("All fields are required");
           }
              const classModel = new ClassModel({
                instituteId,
                name,
                departmentId
              });

              await classModel.save();

                res.status(201).json({
                    status: "201",
                    message: "Class created successfully",
                    classModel
                });

            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        }

        static async getClasses(req, res) {
            try {
                const classes = await ClassModel.find({});
                res.status(200).json({
                    status: "200",
                    message: "Classes fetched successfully",
                    classes
                });
            } catch (e) {
                throw new Error(e.message);
            }
        }
        
}
export default classController;