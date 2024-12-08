import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get('/', adminControllers.getAllAdmin);

router.get('/:id', adminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  adminControllers.updateAdmin,
);

router.delete('/:id', adminControllers.deleteAdmin);

export const AdminRoutes = router;
