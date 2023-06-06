import { Request, Response } from 'express';
import { HTTP_STATUS, formatOrderNumber } from '~/utils';
import { ProductType, User, Product } from '~/models';

const CoffeeTypeController = {
  createNewType: async (req: Request, res: Response) => {
    const { name, userID } = req.body;
    try {
      const productType = new ProductType({ name, createdBy: userID });
      await productType.save();
      res.status(HTTP_STATUS.CREATED).json(productType);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  getAllTypes: async (req: Request, res: Response) => {
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
  getTypeDataByID: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Missing ID!' });
    try {
      const productType = await ProductType.findById(id).exec();
      if (!productType) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not Found!' });
      const result = {
        _id: productType._id,
        value: productType.name,
      };
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
};

export default CoffeeTypeController;
