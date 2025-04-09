import Role from "../models/roleModel.js";

const roleController = async (req, res) => {
  const { role } = req.body;
  
    if (!role) {
      const error = new Error("Please fill the role field");
      res.status(400)
      throw error;

    }
    const lowerCaseRole = role.toLowerCase();
     const roleExist = await Role.findOne({ role: lowerCaseRole });

    if (!roleExist) {

    const newRole = await Role.create({ role });
    return res.status(201).json({ message: "Role Created Successfully" ,status: 201});
     
    }
    
     const error = new Error("Role Already Exists");
    res.status(400);
    throw error;
};
export default roleController;
