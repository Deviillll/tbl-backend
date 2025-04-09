import Allocation from "../models/allocationModel.js";
import Schedule from "../models/scheduleModel.js";
import SubClass from "../models/subClassModel.js";
import Class from "../models/classModel.js";
import Course from "../models/courseModel.js";
import Teacher from "../models/teacherModel.js";
import Section from "../models/sectionModel.js";
import Room from "../models/roomModel.js";
import Department from "../models/departmentModel.js";
import Institute from "../models/instituteModel.js";

class AllocationController {
  // static async createAllocation(req, res) {
  //   try {
  //     const {
  //       instituteId,
  //       departmentId,
  //       scheduleId,
  //       courseId,
  //       teacherId,
  //       roomId,
  //       subClassId,
  //       sectionId,
  //       classId,
  //     } = req.body;

  //     if (
  //       !instituteId ||
  //       !scheduleId ||
  //       !courseId ||
  //       !teacherId ||
  //       !roomId ||
  //       !classId ||
  //       !subClassId
  //     ) {
  //       res.status(400);
  //       throw new Error("All fields are required");
  //     }
  //     // validations for the collapse of the allocation like if room is already allocated with the same schedule and same for teacher if he is already allocated with the same schedule and same for the course and same for the subclass and same for the section and same for the class

  //     // first find the schedule

  //     const schedule = await Schedule.findById(scheduleId);
  //     if (!schedule) {
  //       res.status(404);
  //       throw new Error("Schedule not found");
  //     }
  //     // find the allocation with the same schedule and same room and same teacher and same course and same subclass and same section and same class

  //     let ExistAllocation;
  //     if (sectionId) {
  //       ExistAllocation = await Allocation.findOne({
  //         scheduleId,
  //         roomId,
  //         teacherId,
  //         subClassId,
  //         classId,
  //       });
  //     } else {
  //       ExistAllocation = await Allocation.findOne({
  //         scheduleId,
  //         roomId,
  //         teacherId,
  //         courseId,
  //         subClassId,
  //         sectionId,
  //         classId,
  //       });
  //     }
  //     if (ExistAllocation) {
  //       res.status(400);
  //       throw new Error(
  //         "Allocation already exists with the same schedule and same room and same teacher and same course and same subclass and same section and same class"
  //       );
  //     }
  //     // find the room

  //     const allocation = new Allocation({
  //       instituteId,
  //       departmentId,
  //       scheduleId,
  //       courseId,
  //       teacherId,
  //       roomId,
  //       subClassId,
  //       classId,
  //     });

  //     if (sectionId && sectionId !== "") {
  //       allocation.sectionId = sectionId;
  //     }

  //     await allocation.save();

  //     res.status(201).json({
  //       status: "201",
  //       message: "Allocation created successfully",
  //       allocation,
  //     });
  //   } catch (error) {
  //     return res.status(400).json({ error: error.message });
  //   }
  // }
  static async createAllocation(req, res) {
    try {
      const {
        instituteId,
        departmentId,
        scheduleId,
        courseId,
        teacherId,
        roomId,
        subClassId,
        sectionId,
        classId,
      } = req.body;
  
      if (
        !instituteId ||
        !scheduleId ||
        !courseId ||
        !teacherId ||
        !roomId ||
        !classId ||
        !subClassId
      ) {
        res.status(400);
        throw new Error("All required fields must be filled out.");
      }
  
      // Check if the schedule exists
      const schedule = await Schedule.findById(scheduleId);
      if (!schedule) {
        res.status(404);
        throw new Error("Schedule not found.");
      }
  
      // Check if the room is already allocated for the given schedule
      const roomConflict = await Allocation.findOne({
        scheduleId,
        roomId,
      });
      if (roomConflict) {
        res.status(400);
        throw new Error("Room is already booked for this schedule.");
      }
  
      // Check if the teacher is already allocated for the given schedule
      const teacherConflict = await Allocation.findOne({
        scheduleId,
        teacherId,
      });
      if (teacherConflict) {
        res.status(400);
        throw new Error("Teacher is already allocated for this schedule.");
      }
  
      // Check if the course is already allocated for the given schedule
      const courseConflict = await Allocation.findOne({
        scheduleId,
        courseId,
      });
      if (courseConflict) {
        res.status(400);
        throw new Error("Course is already allocated for this schedule.");
      }
  
      // Check if the subclass is already allocated for the given schedule
      const subClassConflict = await Allocation.findOne({
        scheduleId,
        subClassId,
      });
      if (subClassConflict) {
        res.status(400);
        throw new Error("Subclass is already allocated for this schedule.");
      }
  
      // Check if the section is already allocated for the given schedule (if provided)
      if (sectionId) {
        const sectionConflict = await Allocation.findOne({
          scheduleId,
          sectionId,
        });
        if (sectionConflict) {
          res.status(400);
          throw new Error("Section is already allocated for this schedule.");
        }
      }
  
      // Check if the class is already allocated for the given schedule
      const classConflict = await Allocation.findOne({
        scheduleId,
        classId,
      });
      if (classConflict) {
        res.status(400);
        throw new Error("Class is already allocated for this schedule.");
      }
  
      // Create the allocation
      const allocation = new Allocation({
        instituteId,
        departmentId,
        scheduleId,
        courseId,
        teacherId,
        roomId,
        subClassId,
        classId,
      });
  
      if (sectionId && sectionId.trim() !== "") {
        allocation.sectionId = sectionId;
      }
  
      await allocation.save();
  
      res.status(201).json({
        status: "201",
        message: "Allocation created successfully.",
        allocation,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  static async getAllocation(req, res) {
    try {
      const { instituteId, departmentId } = req.body;
      if (!instituteId) {
        res.status(400);
        throw new Error("Institute ID is required");
      }

      let allocation;

      if (departmentId) {
        allocation = await Allocation.find({ instituteId, departmentId })
          .populate("scheduleId")
          .populate("courseId")
          .populate("teacherId")
          .populate("roomId")
          .populate("subClassId")
          .populate("sectionId")
          .populate("classId")
          .populate("departmentId");
        if (!allocation) {
          res.status(404);
          throw new Error("Allocation not found for this department");
        }
      } else {
        allocation = await Allocation.find({ instituteId })
          .populate("scheduleId")
          .populate("courseId")
          .populate("teacherId")
          .populate("roomId")
          .populate("subClassId")
          .populate("sectionId")
          .populate("classId")
          .populate("departmentId");
        if (!allocation) {
          res.status(404);
          throw new Error("Allocation not found for this institute");
        }
      }

      res.status(200).json({
        status: "200",
        message: "Allocation fetched successfully",
        allocation,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
export default AllocationController;
