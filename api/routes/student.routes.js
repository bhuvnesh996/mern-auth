import express from 'express';
import { fetchAllstudent } from '../controllers/student.controller.js';


const router = express.Router();


router.get('/student/all',fetchAllstudent)
export default router;