
import mongoose from 'mongoose';

const subClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    instituteId: {
        type: String,
        required: true
    }
});

const SubClass = mongoose.model('tbl_subClass', subClassSchema);
export default SubClass;

