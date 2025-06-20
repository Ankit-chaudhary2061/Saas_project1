import express from 'express';
import AuthController from '../../../controller/global/auth/auth.controller';

const router = express.Router();

router.route('/register').post(AuthController.registerUser);
router.route('/login').post(AuthController.loginUser)
export default router;
