import { Router } from 'express';
import { userDetail, updateUserProfile } from '../controllers/authController';

const router = Router();

router.get('/userInfo/:userId', userDetail);
router.put('/userInfo/:userId', updateUserProfile)


export default router;
