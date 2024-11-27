import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-student', UserControllers.createStudent);
router.post('/create-faculty');
router.post('/create-admin');

export const UserRoutes = router;
