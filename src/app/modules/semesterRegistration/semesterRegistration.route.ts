import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import { semesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  semesterRegistrationControllers.getAllSemesterRegistrations,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
