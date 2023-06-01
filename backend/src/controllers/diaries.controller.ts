import { productsdata } from './../../../frontend/src/api/mockData';
import { Request, Response } from 'express';
import { HTTP_STATUS, formatOrderNumber } from '~/utils';
import contract, { web3 } from '~/contract';
import { Diary, Product, Unit, User } from '~/models';

const DiaryController = {
  createDiary: async (req: Request, res: Response) => {
    const { userID, action, descriptions, images } = req.body;
    const { product_id } = req.params;
    if (!product_id || !action) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad request' });
    }
    try {
      const owner = await User.findById({ _id: userID }).exec();
      if (!owner?.wallet) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not Found Owner!' });
      }
      const product = await Product.findById({ _id: product_id }).exec();
      if (product?.producer.toString() !== userID) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'You are not owner of this product!' });
      }
      const isUnlocked = await web3.eth.personal.unlockAccount(owner?.wallet, owner?.password, 3600);
      if (isUnlocked) {
        const actionData = await Unit.findById(action).exec();
        const tx = await contract?.methods.createDiary(product?.token_id, actionData?.value, descriptions).send({
          from: owner?.wallet,
          gas: 2000000,
        });
        console.info('CreateDiary TX: ', tx.transactionHash);
        const diary = new Diary({
          product: product_id,
          action_id: action,
          action_name: actionData?.value,
          descriptions,
          images,
          tx_hash: tx.transactionHash,
          createdBy: userID,
        });
        await diary.save();
        const resData = { ...diary, createdBy: owner?.full_name };
        return res.status(HTTP_STATUS.CREATED).json(resData);
      }
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
