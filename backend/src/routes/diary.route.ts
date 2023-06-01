import { Router } from 'express';
import { DiaryController } from '~/controllers';
import { verifyToken } from '~/middleware';
const router = Router();

router.get('/', verifyToken, DiaryController.getDiariesByProductID);
router.post('/:product_id', verifyToken, DiaryController.createDiary);

export default router;
