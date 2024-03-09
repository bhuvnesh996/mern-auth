import Session from "../models/session.model.js";
import University from "../models/university.model.js";
import Course from '../models/course.model.js'
import { errorHandler } from '../utils/error.js';
import Center from "../models/center.model.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

export const CreateUniversity = async(req,res,next)=>{
    try{
        const {universityName,univserityShortName,vertical,address, UniLogo } = req.body
        const newUni = await University.create({universityName,univserityShortName,vertical,address, UniLogo})
        await newUni.save();
        res.status(201).json({ message: 'University created successfully' });
    }catch(error){
        next(error)
    }

}


export const FetchUniversity = async (req,res,next) =>{
    try{
        const FetchUniversity = await University.find({})
        console.log("check me ")
        if(!FetchUniversity){
            res.status(500).json({message:'No Data Found'})
        }
        res.status(201).json(FetchUniversity)
    }catch(error){
        next(error)
    }
}


export const DeleteUniversity = async (req,res,next)=>{
        console.log(req.user)
        if (!req.params.id) {
            return next(errorHandler(404, 'NO id presend at moment'));
        }
        try {
        await University.findByIdAndDelete(req.params.id)
        res.status(200).json('University has been deleted...');
    }catch(error){
        next(error)
    }
}



export const UniversitySessionCreate = async (req,res,next)=>{

    try {
        const {universityID , sessionName,status} = req.body
        const university = University.findById(universityID)
        if(!university){
            return next(errorHandler(404,'No university found'))
        }
        const session = new Session({university:universityID,sessionName:sessionName,status:status})
        await session.save()
        const allsession = await Session.find().populate('university')
        res.status(201).json(allsession)

    }catch(error){
        next(error)
    }

}

export const UniversitySessionGet = async(req,res,next) => {
    try{
        const session = await Session.find({}).populate('university')
        res.status(201).json(session)
    }catch(error){
        next(error)
    }
}

export const UniversitySessionDelete = async (req,res,next) =>{
    try{
        const id =  req.params.id
        await Session.findByIdAndDelete(id) 
        const session = await Session.find({}).populate('university')
        res.status(201).json(session)

    }catch(error){
        next(error)
    }
}


export const UniversitySessionUpdate = async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            status: req.body.status
          },
        },
        { new: true }
      );
      const session = await Session.find({}).populate('university')
      res.status(201).json(session)

    } catch (error) {
      next(error);
    }
  };







export const  createCourseAndLinkToUniversity = async (req,res,next) => {
    try {
        // Check if the university exists
        console.log("data in Course",req.body )
        const university = await University.findById(req.body.university);
        if (!university) {
            next('University not found');
        }

            // Create a new course
    const newCourse = new Course(req.body);

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Link the course to the university by pushing its ObjectId to the university's course array
    const updatedUniversity = await University.findByIdAndUpdate(
        req.body.university,
        { $push: { course: savedCourse._id } },
        { new: true }
    );
        return res.status(200).json(savedCourse);
    } catch (error) {
        next(error);
    }
}


export const getAllCoursesWithUniversity = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no query parameter is provided
    const limit = 10; // Number of courses per page

    try {
        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Retrieve courses from the database, limiting the results and populating the 'university' field
        const courses = await Course.find().skip(skip).limit(limit).populate('university');

        // Count total number of courses
        const totalCount = await Course.countDocuments();

        // If no courses are found, return a 404 error
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: 'No courses found' });
        }

        // If courses are found, return them along with pagination metadata
        return res.status(200).json(courses);
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

export const deleteCoursesWithRelatedUniversity =  async (req,res,next) =>{
    try {
        const courseId = req.params.id;
    
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
    
        // Remove the course ID from the University model
        await University.updateMany(
          { _id: { $in: course.university } },
          { $pull: { courses: courseId } }
        );
    
        // Delete the course
        await Course.findByIdAndDelete(courseId);
    
        // Respond with success message and deleted course ID
        res.json({ message: 'Course deleted successfully', deletedCourseId: courseId });
      } catch (error) {
        console.error('Error deleting course:', error);
        next(error);
      }
}



export const onBoardingCenter = async (req,res,next) => {
    try {
        // Extract center data and user data from request body
        const { centerData, userData } = req.body;
        console.log("centerData",centerData)
        console.log("userData",userData)
    
        // Create a new center document
        const newCenter = new Center(centerData);
        await newCenter.save();
    
        // Hash the password for the user account
        const hashedPassword = await bcryptjs.hashSync(userData.password, 10);
    
        // Create a new user document associated with the center
        const newUser = new User({
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
          profilePicture: userData.profilePicture,
          center: newCenter._id, // Associate the user with the newly created center
        });
        await newUser.save();
    
        // Return success message
        res.status(201).json(newCenter);
      } catch (error) {
        console.error('Error onboarding center and creating user account:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}
export const allCenter = async(req,res,next) =>{
    try{
        const center =  await Center.find();
        res.status(200).json(center)

    }catch(error){
        next(error)
    }
}


export const deleteCenterWithRelatedUser =  async (req,res,next) =>{
const centerId = req.params.id;

  try {
    // Find the center by ID
    const center = await Center.findById(centerId);

    if (!center) {
      return res.status(404).json({ error: "Center not found" });
    }

    // Find the user associated with the center
    const user = await User.findOne({ center: centerId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user associated with the center
    await User.findByIdAndDelete(user._id);

    // Delete the center
    await Center.findByIdAndDelete(centerId);

    res.json({ message: "Center and its associated user deleted successfully" ,centerID :center._id });
  } catch (err) {
    console.error("Error deleting center:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
