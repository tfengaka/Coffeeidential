import { Request, Response } from 'express';
import { HTTP_STATUS } from '~/utils';
import { ProductType } from '~/models';

const ProductController = {
  createProductType: async (req: Request, res: Response) => {
    const { name, userID } = req.body;
    try {
      const productType = new ProductType({ name, createdBy: userID });
      await productType.save();
      res.status(HTTP_STATUS.CREATED).json({ message: 'OK' });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  getProductTypes: async (req: Request, res: Response) => {
    try {
      const productTypes = await ProductType.find();
      const result = productTypes.map((productType) => ({
        _id: productType._id,
        value: productType.name,
      }));
      res.status(HTTP_STATUS.OK).json({ data: result });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
};

export default ProductController;
