import { Router } from 'express';
import { UnitController } from '~/controllers';
const router = Router();

router.get('/', UnitController.getUnitByType);
router.post('/', UnitController.createUnit);

export default router;
