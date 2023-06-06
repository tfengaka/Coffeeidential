import { Router } from 'express';
import { CoffeeTypeController } from '~/controllers';
import { verifyToken } from '~/middleware';

const router = Router();

router.post('/', verifyToken, CoffeeTypeController.createNewType);
router.get('/', CoffeeTypeController.getAllTypes);
router.get('/:id', CoffeeTypeController.getTypeDataByID);

export default router;
