import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { facultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', auth('admin'), FacultyControllers.deleteFaculty);

router.get('/', auth('admin', 'faculty'), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
