import { Router } from 'express';
import { userDetail, updateUserProfile } from '../controllers/authController';

const authRoutes = Router();

authRoutes.get('/userInfo/:userId', userDetail);
authRoutes.put('/userInfo/:userId', updateUserProfile)


export default authRoutes;
