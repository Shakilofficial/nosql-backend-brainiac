import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { courseControllers } from './course.controller';
import { courseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);
router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  courseControllers.getSingleCourse,
);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse,
);
router.delete('/:id', auth('admin'), courseControllers.deleteCourse);
router.get('/', courseControllers.getAllCourses);

router.put(
  '/:id/assign-faculties',
  auth('admin'),
  validateRequest(courseValidations.facultiesWithCoursesValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:id/remove-faculties',
  auth('admin'),
  validateRequest(courseValidations.facultiesWithCoursesValidationSchema),
  courseControllers.removeFacultiesFromCourse,
);
export const CourseRoutes = router;
