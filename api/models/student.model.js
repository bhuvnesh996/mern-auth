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
    applicationStatusReason :{
        type:String,
        default:"Admin is reviewing your application"
    } ,

    
    docStatus: {
        type: String,
        enum: ['pending', 'verified', 'revert','recheck'],
        default: 'pending'
    },
    docStatusReason:{
        type:String,
        default:"Admin is checking the documents"
    },
    
    unicode: {
        type: String,
   
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        required: true
    },

    studentType : {
        type:String ,
        enum:['Fresh','RR'],
        default: 'Fresh'
    },
    paymentStatus : {
        type:String,
        enum:['Pending','Payed','Rejected'],
        default:'Pending'
    },
    // Dynamic form data stored as key-value pairs
    dynamicFormData: {
        type: Map,
        of: mongoose.Schema.Types.Mixed // Allow any type of value
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
