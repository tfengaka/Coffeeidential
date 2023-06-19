import { Router } from 'express';
import { LookUpController } from '~/controllers';
import { verifyToken } from '~/middleware';
const router = Router();

router.get('/products', LookUpController.getTopProduct);
router.get('/statistics', verifyToken, LookUpController.getLookUpHistory);
router.get('/:product_id', LookUpController.lookUpProduct);

export default router;
