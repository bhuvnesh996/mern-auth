import mongoose from "mongoose";

// Define Course schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specializations: [{
        type: String
    }],
  
    graducationLevel : {
        type:String,
        default:"UG"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    university: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"University"
    }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;