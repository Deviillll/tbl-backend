import Course from "../models/courseModel.js";

class courseController{
    static async createCourse(req, res){
        try{
            const {name, courseId,instituteId,departmentId,creditHours} = req.body;
            if(!name || !courseId  || !instituteId || !creditHours ){
               res.status(400)
               throw new Error("All fields are required");
            }
            const course = new Course({
                name,
                code:courseId,
                instituteId,
                departmentId,
                creditHours
            });
            await course.save();
            res.status(201).json({
                status: "201",
                message: "course created successfully",
                course
            });

        }catch(e){
            res.status(500)
            throw new Error(e.message);
        }
    
    }

    static async getCourses(req, res){
        try{
            const courses = await Course.find({});
            res.status(200).json({
                status: "200",
                message: "Courses fetched successfully",
                courses
            });
        }catch(e){
            throw new Error(e.message);
        }
    }

}
export default courseController;