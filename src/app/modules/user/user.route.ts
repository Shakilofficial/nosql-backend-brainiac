import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post('/create-faculty');
router.post('/create-admin');

export const UserRoutes = router;
