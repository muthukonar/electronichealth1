import { Router } from 'express';
import { patientRouter } from './patient-routes.js';
import { drRouter } from './dr-routes.js';


const apiRouter = Router();

apiRouter.use('/patients', patientRouter);
apiRouter.use('/doctors', drRouter);

export default apiRouter;
