import { Request, Response } from 'express';
import { Diary, Lookup, Product, User } from '~/models';
import { DiaryModel, ProductModel, UserModel } from '~/type';
import { HTTP_STATUS } from '~/utils';

const LookupController = {
  lookUpProduct: async (req: Request, res: Response) => {
    const { product_id } = req.params;
    if (!product_id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
    }
    try {
      const product = await Product.findOne({ order_id: product_id }).populate('producer').exec();
      if (!product) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Product not found!' });
      }
      const { password: _, ...producerData } = product.toObject().producer as unknown as UserModel;
      const rawDiaries = await Diary.find({ product: product._id }).exec();
      if (rawDiaries) {
        const diaries = await Promise.all(
          rawDiaries.map(async (diary) => {
            const owner = await User.findById({ _id: diary.createdBy }).exec();
            const data = diary.toObject();
            return { ...data, createdBy: owner?.full_name };
          })
        );
        const resData = {
          ...product.toObject(),
          producer: producerData,
          diaries,
        };
        await Lookup.create({ product: product._id });
        return res.status(HTTP_STATUS.OK).json(resData);
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Missing Query Data!' });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
};

export default LookupController;
