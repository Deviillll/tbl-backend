import Institute from "../models/instituteModel.js";
import Resolver from "../models/resolverModel.js";
import Role from "../models/roleModel.js";

class InstituteController {
  static async create(req, res) {
    const file = req.file;
    const userId = req.user;
    const role = req.role;
    

    const roleExist = await Role.findById({ _id: role });
    

    if (roleExist.role !== "admin") {
      res.status(401);
      throw new Error("Unauthorized access");
    }
    try {
      const instituteExist = await Institute.find({ user_id: userId });
      console.log(instituteExist);
      if (instituteExist.length > 0) {
        res.status(400);
        throw new Error("you can only create one institute");
      }

      const {
        name,
        address,
        city,
        state,
        country,
        contact,
        email,
        website,
        description,
        level,
      } = req.body;

      if (
        !name ||
        !address ||
        !city ||
        !state ||
        !country ||
        !contact ||
        !email ||
        !description
      ) {
        res.status(400);
        throw new Error("All fields are required");
      }

      const institute = new Institute({
        name,
        address,
        city,
        state,
        country,
        contact,
        email,
        website,
        description,
        userId,
        level,
      });
      if (file) {
        const logo = file.path;
        institute.logo = logo;
      }

      const savedInstitute = await institute.save();
      const resolver = await Resolver.create({
        user_id: userId,
        institute_id: savedInstitute._id,
      });

      res.status(201).json({
        message: "Institute created successfully",
        data: savedInstitute,
      });
    } catch (error) {
        throw new Error(error.message)
    }
  }
}

export default InstituteController; 
