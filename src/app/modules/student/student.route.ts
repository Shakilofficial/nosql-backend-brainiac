import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStudent);

router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

router.get(
  '/',
  auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  StudentControllers.getAllStudents,
);

export const StudentRoutes = router;
