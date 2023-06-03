import { Router } from 'express';
import { CoffeeTypeController } from '~/controllers';
import { verifyToken } from '~/middleware';

const router = Router();

router.post('/', verifyToken, CoffeeTypeController.createNewType);
router.get('/', CoffeeTypeController.getAllTypes);

export default router;
