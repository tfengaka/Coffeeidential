import { Request, Response } from 'express';
import { contract, web3 } from '~/contract';
import { Product, ProductType, TXRecord } from '~/models';
import { HTTP_STATUS, formatOrderNumber } from '~/utils';

const ProductController = {
  createProduct: async (req: Request, res: Response) => {
    const { userID, ...productdata } = req.body;
    if (!productdata) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: 'Dữ liệu chưa đẩy đủ, Vui lòng bổ sung thêm thông tin!' });
    }
    try {
      const alreadyProduct = await Product.findOne({ name: productdata.name }).exec();
      if (alreadyProduct) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Sản phẩm này đã được đăng ký trên hệ thống!' });
      }
      const type = await ProductType.findById(productdata.product_type).exec();
      const tx = await contract?.methods
        .createNewProduct(productdata.name, type?.name, productdata.description, productdata.price)
        .send({
          from: web3.eth.defaultAccount,
          gas: 2000000,
        });
      await TXRecord.create({
        topic: 'createdProduct',
        tx_hash: tx.transactionHash,
        receipt: tx,
        createdBy: userID,
      });
      const productCount = await Product.countDocuments();
      const product = new Product({
        ...productdata,
        _id: formatOrderNumber('PM', productCount + 1),
        producer: userID,
        hash_token: tx.events.CreatedProduct.returnValues.id,
        tx_hash: tx.transactionHash,
      });
      await product.save();
      return res.status(HTTP_STATUS.CREATED).json({
        product,
      });
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
      const { id, is_production, userID } = req.body;
      const product = await Product.findByIdAndUpdate(id, { $set: { is_production } }, { new: true });
      if (!product) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Not Found!' });
      }
      if (product.producer !== userID) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized!' });
      }
      res.status(HTTP_STATUS.OK).json(product);
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
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
      console.error(error);
    }
  },
};

export default ProductController;
