import { Request, Response } from 'express';
import moment from 'moment';
import { Diary, Lookup, Product } from '~/models';
import { ProductModel, UserModel } from '~/type';
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
      const { password: _, ...producer } = product.toObject().producer as unknown as UserModel;
      const rawDiaries = await Diary.find({ product: product._id }).populate('createdBy').exec();
      const diaries = rawDiaries.map((diary) => {
        const { order_id, full_name, email, wallet } = diary.toObject().createdBy as unknown as UserModel;
        return { ...diary.toObject(), createdBy: { order_id, full_name, email, wallet } };
      });
      await Lookup.create({ product: product._id });
      return res.status(HTTP_STATUS.OK).json({ ...product.toObject(), producer, diaries });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  getLookUpHistory: async (req: Request, res: Response) => {
    const { limit } = req.query;
    try {
      const data = (await Lookup.find().populate('product').exec()) as any[];

      const chartData = [];
      const today = new Date();
      for (let i = 0; i < Number(limit); i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        const dateStr = moment(date).format('DD/MM/YY');
        const lookupData = data.filter((item) => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate.getDate() === date.getDate() &&
            itemDate.getMonth() === date.getMonth() &&
            itemDate.getFullYear() === date.getFullYear()
          );
        });
        chartData.push({ date: dateStr, count: lookupData.length });
      }

      const topScan = data
        .map((item) => item.product.toObject())
        .reduce((acc, cur) => {
          const index = acc.findIndex((item: ProductModel) => item.order_id === cur.order_id);
          if (index === -1) {
            const { order_id, name, images } = cur;
            acc.push({ order_id, name, images, count: 1 });
          } else {
            acc[index].count += 1;
          }
          return acc;
        }, [])
        .sort((a: { count: number }, b: { count: number }) => b.count - a.count)
        .slice(0, 5);

      return res.status(HTTP_STATUS.OK).json({ scan_count: chartData, top_products: topScan });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
    }
  },
};

export default LookupController;
