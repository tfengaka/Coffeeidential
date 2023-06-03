import { Router } from 'express';
import { LookUpController } from '~/controllers';
const router = Router();

router.get('/:product_id', LookUpController.lookUpProduct);

export default router;
