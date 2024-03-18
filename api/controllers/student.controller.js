import Student from "../models/student.model";
import University from "../models/university.model";

export const fetchAllstudent = async(req,res,next) =>{
    try{

    }catch(error){
        next(error)
    }
}


export const createStudent  = async(req,res,next) =>{
    try {
        // Extract student data from the request body
        const {
            university,
            session,
            course,
            specialization,
            center,
            onboardedCenter,
            studentType,
            dynamicFormData
        } = req.body;

        // Retrieve the assigned university document
        const assignedUniversity = await University.findById(university);

        if (!assignedUniversity) {
            return res.status(404).json({ error: 'University not found' });
        }

        // Generate a random 5-digit number
        const randomDigits = Math.floor(10000 + Math.random() * 90000);

        // Concatenate the university's Unicode with the random number
        const unicode = assignedUniversity.UniversityCode + randomDigits.toString();

        // Create a new student instance with the generated Unicode
        const newStudent = new Student({
            university,
            session,
            course,
            specialization,
            center,
            onboardedCenter,
            studentType,
            dynamicFormData,
            unicode
        });

        // Save the student to the database
        const savedStudent = await newStudent.save();

        // Send a success response with the saved student data
        res.status(201).json(savedStudent);
    } catch (error) {
        // If an error occurs, send a 500 (Internal Server Error) response
        next(error)
    }
}