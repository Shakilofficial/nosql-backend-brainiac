import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseControllers } from './course.controller';
import { courseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);
router.get('/:id', courseControllers.getSingleCourse);
router.delete('/:id', courseControllers.deleteCourse);
router.get('/', courseControllers.getAllCourses);

export const CourseRoutes = router;
