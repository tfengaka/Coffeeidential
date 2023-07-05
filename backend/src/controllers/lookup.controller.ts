import { Request, Response } from 'express';
import moment from 'moment';
import { Diary, Lookup, Product, ProductType, Unit, User } from '~/models';
import { ProductModel, UserModel } from '~/type';
import { HTTP_STATUS } from '~/utils';

const LookupController = {
  lookUpProduct: async (req: Request, res: Response) => {
    const { product_id } = req.params;
    if (!product_id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
    }
    try {
      const product = await Product.findById(product_id).populate('producer').exec();
      if (!product) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Product not found!' });
      }
      const { password: _, ...producer } = product.toObject().producer as unknown as UserModel;
      const rawDiaries = await Diary.find({ product: product._id }).populate('createdBy').exec();
      const diaries = rawDiaries.map((diary) => {
        const { _id, full_name, email } = diary.toObject().createdBy as unknown as UserModel;
        return { ...diary.toObject(), createdBy: { _id, full_name, email } };
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
    const { userID } = req.body;
    try {
      const allData = (await Lookup.find({}).populate('product').exec()) as any[];
      const filteredData = allData.filter((item) => item.product.producer === userID);
      const chartData = [];
      const today = new Date();

      for (let i = 0; i < Number(limit); i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        const dateStr = moment(date).format('DD/MM/YY');
        const lookupData = filteredData.filter((item) => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate.getDate() === date.getDate() &&
            itemDate.getMonth() === date.getMonth() &&
            itemDate.getFullYear() === date.getFullYear()
          );
        });
        chartData.push({ date: dateStr, count: lookupData.length });
      }

      const topScan = filteredData
        .map((item) => item.product.toObject())
        .reduce((acc, cur) => {
          const index = acc.findIndex((item: ProductModel) => item._id === cur._id);
          if (index === -1) {
            const { _id, name, images } = cur;
            acc.push({ _id, name, images, count: 1 });
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
      console.error(error);
    }
  },
  getTopProduct: async (req: Request, res: Response) => {
    const { limit } = req.query;
    try {
      const data = await Product.find({ is_production: true }).exec();
      const topProducts = await Promise.all(
        data.map(async (item) => {
          const { _id, name, images, description, price, product_type, selling_unit } = item.toObject();
          const typeName = await ProductType.findById(product_type).exec();
          const sellUnit = await Unit.findById(selling_unit).exec();
          const owner = await User.findById(item.producer).exec();
          return {
            _id,
            name,
            images,
            description,
            price,
            selling_unit: sellUnit?.value,
            product_type: typeName?.name,
            producer: {
              _id: owner?.id,
              full_name: owner?.full_name,
              avatar: owner?.avatar,
              email: owner?.email,
              phone: owner?.phone,
            },
          };
        })
      );

      return res.status(HTTP_STATUS.OK).json({
        top_products: topProducts.slice(0, Number(limit)),
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
};

export default LookupController;
