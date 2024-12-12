import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import { semesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', semesterRegistrationControllers.getAllSemesterRegistrations);

router.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
