import Institute from "../models/instituteModel.js";
import Shift from "../models/shiftModel.js";

class ShiftController{
    static async createShift(req, res){
        const {shiftName, startTime, endTime} = req.body;
        try {
          
            const instituteId=await Institute.findOne({userId:req.user});

            if(!instituteId){
                return res.status(400).send({message:"Institute not found"});
            }
            if(!shiftName || !startTime || !endTime){
                return res.status(400).send({message:"All fields are required"});
            }
            const shift = new Shift({
                shiftName,
                startTime,
                endTime,
                instituteId: instituteId._id
            });

            await shift.save();
            res.status(201).json({message:"Shift created successfully"});
            
        } catch (error) {
            throw new Error(error);
        }
    }
}


export default ShiftController;