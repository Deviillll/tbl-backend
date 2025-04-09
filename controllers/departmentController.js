import DepartmentModel from '../models/departmentModel.js';
class Department{
    static async createDepartment(req, res){
        try {
            const {name, instituteId, shiftId} = req.body;
            if(!name || !instituteId || !shiftId){
                return res.status(400).json({message: 'Please provide all the required fields'});
            }
            


            const department = new DepartmentModel ({
                name,
                instituteId,
                shiftId
            });
            const result = await department.save();
            if(result){
                return res.status(201).json({message: 'Department created successfully'});
            }
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
    static async getDepartments(req, res){
        try {
            const departments = await DepartmentModel.find();
            if(departments){
                return res.status(200).json({departments});
            }
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

export default Department;