import Student from "../models/student.model.js";
import University from "../models/university.model.js";

export const fetchAllstudent = async(req,res,next) =>{
   
        try {
            // Query the database for fresh students
            const freshStudents = await Student.find({ studentType: 'Fresh' })
            .populate('university')
            .populate('session')
            .populate('course')
            .populate('center');
    
            // Send the fresh students as the response
            res.status(200).json(freshStudents);
        } catch (error) {
            // If an error occurs, send an error response
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


export const changeDocStatus = async (req,res,next) =>{
    const { id } = req.params;
    const { docStatus, docStatusReason } = req.body;
    console.log("doc status,reson",req.body)
    try {
        const updateData = {
            docStatus: docStatus,
            docStatusReason:docStatusReason
        };

      

        const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true })        
                                                                .populate('university')
                                                                .populate('session')
                                                                .populate('course')
                                                                .populate('center');

        if (!updatedStudent) {
            res.status(404)
        }

        res.status(200).send(updatedStudent);
    } catch (error) {
        next(error);
    }
}
export const changeApplicatiohStatus = async (req,res,next) =>{
    const { id } = req.params;
    const { applicationStatus, applicationStatusReason } = req.body;
    console.log("doc status,reson",req.params)
    try {
        const updateData = {
            applicationStatus: applicationStatus,
            applicationStatusReason:applicationStatusReason
        };

      
        console.log("updated data",updateData)
        const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true })        
                                                                .populate('university')
                                                                .populate('session')
                                                                .populate('course')
                                                                .populate('center');
                                                                
         console.log("updated data",updatedStudent)                                                       

        if (!updatedStudent) {
            res.status(404)
        }

        res.status(200).send(updatedStudent);
    } catch (error) {
        next(error);
    }
}



export const fetchStudents = async(req,res,next) =>{
   
    try {
        // Query the database for student
        const freshStudents = await Student.find()
        .populate('university')
        .populate('session')
        .populate('course')
        .populate('center');

        // Send the fresh students as the response
        res.status(200).json(freshStudents);
    } catch (error) {
        // If an error occurs, send an error response
        next(error)
    }

}
