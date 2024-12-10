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
router.patch(
  '/:id',
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse,
);
router.delete('/:id', courseControllers.deleteCourse);
router.get('/', courseControllers.getAllCourses);

router.put(
  '/:id/assign-faculties',
  validateRequest(courseValidations.facultiesWithCoursesValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:id/remove-faculties',
  validateRequest(courseValidations.facultiesWithCoursesValidationSchema),
  courseControllers.removeFacultiesFromCourse,
);
export const CourseRoutes = router;
