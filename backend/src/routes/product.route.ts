import { Router } from 'express';
import { ProductController } from '~/controllers';

const router = Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProductsByOwner);
router.put('/', ProductController.updateProductStatus);

export default router;
