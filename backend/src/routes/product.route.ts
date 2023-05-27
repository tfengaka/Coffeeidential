import { Router } from 'express';
import { ProductController } from '~/controllers';
import { verifyToken } from '~/middleware';

const router = Router();

router.post('/types', verifyToken, ProductController.createProductType);
router.get('/types', ProductController.getProductTypes);

export default router;
