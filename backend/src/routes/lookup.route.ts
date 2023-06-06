import { Router } from 'express';
import { LookUpController } from '~/controllers';
const router = Router();

router.get('/statistics', LookUpController.getLookUpHistory);

router.get('/:product_id', LookUpController.lookUpProduct);

export default router;
