import { stat } from 'fs';
import TeacherModel from '../models/teacherModel.js';
class Teacher{
    static async createTeacher(req, res){
        try{
            const {name, email, cnic, phone, instituteId, departmentId} = req.body;
            if(!name || !email || !cnic || !phone || !instituteId || !departmentId){
               res.status(400)
               throw new Error("All fields are required");
            }
            const teacher = new TeacherModel({
                name,
                email,
                cnic,
                phone,
                instituteId,
                departmentId
            });
            await teacher.save();
            res.status(201).json({
                status: "201",
                message: "Teacher created successfully",
                teacher
            });
        }catch(e){
            res.status(500)
           
            throw new Error(e.message);
        }
    }
    static async getTeachers(req, res){
        try{
            const teachers = await TeacherModel.find({});
            res.status(200).json({
                status: "200",
                message: "Teachers fetched successfully",
                teachers
            });
        }catch(e){
            throw new Error(e.message);
        }
    }
    static async getTeacher(req, res){
        try{
            const teacher = await Teacher.findById(req.params.id);
            if(!teacher){
                return res.status(404).send();
            }
            res.send(teacher);
        }catch(e){
            res.status(500).send(e);
        }
    }
}
export default Teacher;