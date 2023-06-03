import { Request, Response } from 'express';
import { HTTP_STATUS, formatOrderNumber } from '~/utils';
import { ProductType, User, Product } from '~/models';
import contract, { web3 } from '~/contract';

const ProductController = {
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
      const isUnlocked = await web3.eth.personal.unlockAccount(owner?.wallet, owner?.password, 3600);
      if (isUnlocked) {
        const type = await ProductType.findById(productsdata.product_type).exec();
        const productCount = await Product.countDocuments();
        const tx = await contract?.methods
          .createNewProduct(formatOrderNumber('PM', productCount + 1), productsdata.name, type?.name)
          .send({
            from: owner?.wallet,
            gas: 2000000,
          });
        console.info('Created Product TX: ', tx.transactionHash);
        const product = new Product({
          ...productsdata,
          order_id: formatOrderNumber('PM', productCount + 1),
          producer: userID,
          token_id: tx.events.createdProduct.returnValues.tokenID,
          tx_hash: tx.transactionHash,
        });
        await product.save();
        return res.status(HTTP_STATUS.CREATED).json(product);
      }
      return res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Cant Unlock Account!' });
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
  updateProductData: async (req: Request, res: Response) => {
    const { userID, ...data } = req.body;
    const { id } = req.params;
    if (!data || !id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
    }
    try {
      const product = await Product.findByIdAndUpdate(id, { $set: { ...data } }, { new: true });
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
