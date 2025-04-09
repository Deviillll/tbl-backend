import Room from "../models/roomModel.js";

class RoomClass{
    static async createRoom(req, res) {
        try {
            const { roomName, instituteId, roomCapacity,departmentId } = req.body;
            if (!roomName || !instituteId || !roomCapacity || !departmentId) {
                res.status(400)
                throw new Error("All fields are required");
            }
            const room = new Room({
                roomName,
                instituteId,
                capacity:roomCapacity,
                departmentId
            });
            await room.save();
            res.status(201).json({
                status: "201",
                message: "Room created successfully",
                room
            });
        } catch (e) {
            res.status(500)
            throw new Error(e.message);
        }
    }
    static async getRooms(req, res) {
        try {
            const rooms = await Room.find({});
            res.status(200).json({
                status: "200",
                message: "Rooms fetched successfully",
                rooms
            });
        } catch (e) {
            throw new Error(e.message);
        }
    }

}
export default RoomClass;