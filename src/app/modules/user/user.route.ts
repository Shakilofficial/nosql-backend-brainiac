import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createStudentValidationSchema } from '../student/student.validation';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.get('/me', auth('admin', 'faculty', 'student'), UserControllers.getMe);

router.patch(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

export const UserRoutes = router;
