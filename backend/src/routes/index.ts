import { Router } from 'express';
import { getNodeStatus, getNodeWallets } from '~/controllers';
import { verifyToken } from '~/middleware';

import AuthRouter from './auth.route';
import TypesRouter from './coffeetypes.route';
import DiaryRouter from './diary.route';
import LookUpRouter from './lookup.route';
import ProductRouter from './product.route';
import TestRouter from './test.route';
import UnitRouter from './unit.route';
import UserRouter from './user.route';

const router = Router();

router.get('/status', getNodeStatus);
router.get('/wallets', getNodeWallets);

router.use('/', AuthRouter);
router.use('/units', UnitRouter);
router.use('/products', verifyToken, ProductRouter);
router.use('/users', verifyToken, UserRouter);
router.use('/diaries', DiaryRouter);
router.use('/types', TypesRouter);
router.use('/lookup', LookUpRouter);

router.use('/blockchain', TestRouter);

export default router;
