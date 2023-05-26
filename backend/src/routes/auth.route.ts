import { Router } from 'express';
import { AuthController } from '~/controllers';
import { verifyToken } from '~/middleware';

const router = Router();
router.post('/sign-in', AuthController.signIn);
router.post('/sign-up', AuthController.signUp);
router.get('/me', verifyToken, AuthController.getMe);

export default router;
