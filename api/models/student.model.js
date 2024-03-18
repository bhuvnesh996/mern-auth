import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    // Fixed student attributes
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'approved', 'cancelled'],
        default: 'pending'
    },
    applicationReason :String ,

    
    docStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    docStatusReason:{
        type:String,
        default:""
    },
    unicode: {
        type: String,
        required: true
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        required: true
    },
    onboardedCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        required: true
    },
    studentType : {
        type:String ,
        enum:['Fresh,RR'],
        default: 'Fresh'
    },
    // Dynamic form data stored as key-value pairs
    dynamicFormData: {
        type: Map,
        of: mongoose.Schema.Types.Mixed // Allow any type of value
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
