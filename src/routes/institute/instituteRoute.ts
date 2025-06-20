import express from 'express';
import InstituteController from '../../controller/institute/instituteController';


const router = express.Router();

router.route('/').post(InstituteController.createInstitute);

export default router;
