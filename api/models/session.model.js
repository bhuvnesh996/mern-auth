import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    university: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University', // Refers to the University model
        required: true
    },
    sessionName: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

export default Session;
