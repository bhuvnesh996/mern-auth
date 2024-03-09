import express from 'express';
import { verifyAdmin } from '../utils/verifyAdmin.js';
import { CreateUniversity, DeleteUniversity, FetchUniversity, UniversitySessionCreate, UniversitySessionDelete, UniversitySessionGet, UniversitySessionUpdate, allCenter, createCourseAndLinkToUniversity, deleteCenterWithRelatedUser, deleteCoursesWithRelatedUniversity, getAllCoursesWithUniversity, onBoardingCenter } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/university/create', CreateUniversity );

router.get('/university/all',FetchUniversity);
router.delete('/university/delete/:id',DeleteUniversity);

router.get('/university/session/all',UniversitySessionGet)
router.post('/university/session/create',UniversitySessionCreate)
router.delete('/university/session/delete/:id',UniversitySessionDelete)
router.put('/university/session/update/:id',UniversitySessionUpdate)

router.post('/university/course/create',createCourseAndLinkToUniversity)
router.get('/university/course/all',getAllCoursesWithUniversity)
router.delete('/university/course/delete/:id',deleteCoursesWithRelatedUniversity)



router.post('/university/center/create',onBoardingCenter)
router.get('/university/center/all',allCenter)
router.delete('/university/center/delete/:id',deleteCenterWithRelatedUser)



export default router;