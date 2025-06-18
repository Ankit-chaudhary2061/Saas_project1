import express from 'express';
import InstituteController from './instituteController';

const router = express.Router();

router.route('/institute').post(InstituteController.createInstitute);

export default router;
