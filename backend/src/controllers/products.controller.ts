import { Request, Response } from 'express';
import { HTTP_STATUS, formatOrderNumber } from '~/utils';
import { ProductType, User, Product } from '~/models';
import contract, { web3 } from '~/contract';

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
  getProductTypeById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const productType = await ProductType.findById({ _id: id }).exec();
      if (!productType) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not Found!' });
      }
      res.status(HTTP_STATUS.OK).json({
        _id: productType?.id,
        value: productType?.name,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  createProduct: async (req: Request, res: Response) => {
    const { userID, ...productsdata } = req.body;
    if (!productsdata) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
    }
    try {
      const owner = await User.findById({ _id: userID }).exec();
      if (!owner?.wallet) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Bad Request!' });
      }
      web3.eth.personal.unlockAccount(owner?.wallet, owner?.password, 600);
      const type = await ProductType.findById(productsdata.product_type).exec();
      const productCount = await Product.countDocuments();
      const tx = await contract?.methods
        .createNewProduct(formatOrderNumber('PM', productCount + 1), productsdata.name, type?.name)
        .send({
          from: owner?.wallet,
          gas: 2000000,
        });
      console.info('Trasaction Hash: ', tx.transactionHash);
      const product = new Product({
        ...productsdata,
        order_id: formatOrderNumber('PM', productCount + 1),
        producer: userID,
        token_id: tx.events.createdProduct.returnValues.tokenID,
        tx_hash: tx.transactionHash,
      });
      await product.save();
      res.status(HTTP_STATUS.CREATED).json({ tx_hash: tx.transactionHash, product });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  getProductsByOwner: async (req: Request, res: Response) => {
    const { userID } = req.body;
    try {
      const products = await Product.find({ producer: userID }).exec();
      res.status(HTTP_STATUS.OK).json({ products });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  updateProductStatus: async (req: Request, res: Response) => {
    try {
      const { id, is_production } = req.body;
      const product = await Product.findByIdAndUpdate(id, { $set: { is_production } }, { new: true });
      if (!product) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not Found!' });
      }
      res.status(HTTP_STATUS.OK).json(product);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
    }
  },
};

export default ProductController;
