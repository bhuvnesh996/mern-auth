import express from 'express';
import { changeApplicatiohStatus, changeDocStatus, createStudent, fetchAllstudent, fetchStudents } from '../controllers/student.controller.js';


const router = express.Router();


router.get('/student/fresh/all',fetchAllstudent)
router.get('/fetch/all',fetchStudents)

router.post('/student/create',createStudent)
router.put('/student/docstatus/:id',changeDocStatus)
router.put('/student/applicationstatus/:id',changeApplicatiohStatus)
export default router;