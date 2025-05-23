import mongoose from 'mongoose';
 
const sectionSchema = new mongoose.Schema({
   
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
    },
    subClassId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "SubClass",
    }
});

const Section= mongoose.model('tbl_section', sectionSchema);

export default Section;