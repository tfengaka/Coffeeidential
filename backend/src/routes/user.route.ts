import { Router } from 'express';
import { UserController } from '~/controllers';

const router = Router();
router.put('/accounts', UserController.updateAccountInfo);
router.put('/branding', UserController.updateBrandInfo);
router.put('/contacts', UserController.updateContactInfo);

export default router;
