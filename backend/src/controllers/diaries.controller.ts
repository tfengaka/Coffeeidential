import { Request, Response } from 'express';
import { web3, contract } from '~/contract';
import { Diary, Product, TXRecord, Unit, User } from '~/models';
import { HTTP_STATUS } from '~/utils';

const DiaryController = {
  createDiary: async (req: Request, res: Response) => {
    const { userID, action, descriptions, images } = req.body;
    const { product_id } = req.params;
    if (!product_id || !action) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad request' });
    }
    try {
      const product = await Product.findById(product_id).exec();
      if (!product) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Không tìm thấy sản phẩm!' });
      }
      if (product.producer.toString() !== userID) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ message: 'Bạn không có quyền ghi thông tin vào sản phẩm này!' });
      }
      const owner = await User.findById(userID).exec();
      const actionData = await Unit.findById(action).exec();

      const tx = await contract?.methods.createDiary(product.hash_token, actionData?.value, descriptions).send({
        from: web3.eth.defaultAccount,
        gas: 2000000,
      });

      await TXRecord.create({
        topic: 'createdDiary',
        tx_hash: tx.transactionHash,
        receipt: tx,
        createdBy: userID,
      });

      const diary = await Diary.create({
        product: product_id,
        action_id: action,
        action_name: actionData?.value,
        descriptions,
        images,
        tx_hash: tx.transactionHash,
        createdBy: userID,
      });

      const resData = { ...diary.toObject(), createdBy: owner?.full_name };
      return res.status(HTTP_STATUS.CREATED).json(resData);
    } catch (error) {
      console.error(error);
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal server error' });
    }
  },
  getDiariesByProductID: async (req: Request, res: Response) => {
    const { productID } = req.query;
    if (!productID) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad request' });
    }
    try {
      const productDiaries = await Diary.find({ product: productID }).exec();
      const resData = await Promise.all(
        productDiaries.map(async (diary) => {
          const owner = await User.findById({ _id: diary.createdBy }).exec();
          const data = diary.toObject();
          return { ...data, createdBy: owner?.full_name };
        })
      );

      return res.status(HTTP_STATUS.OK).json({ diaries: resData });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal server error' });
    }
  },
};

export default DiaryController;
