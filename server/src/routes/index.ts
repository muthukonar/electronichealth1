import { Router } from 'express';
import patientAuthRoutes from './patient-auth-routes.js';
import drAuthRoutes from './dr-auth-routes.js';
import apiRouter from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth/patient', patientAuthRoutes);
router.use('/auth/doctor', drAuthRoutes);

router.use('/api', authenticateToken, apiRouter);

export default router;
