import { Router } from 'express';
import { getNodeStatus, getNodeWallets } from '~/controllers';
import { verifyToken } from '~/middleware';

import AuthRouter from './auth.route';
import ProductRouter from './product.route';
import UnitRouter from './unit.route';
import UserRouter from './user.route';
import DiaryRouter from './diary.route';

const router = Router();

router.get('/status', getNodeStatus);
router.get('/wallets', getNodeWallets);

router.use('/', AuthRouter);
router.use('/units', UnitRouter);
router.use('/products', ProductRouter);
router.use('/users', verifyToken, UserRouter);
router.use('/diaries', DiaryRouter);

export default router;
