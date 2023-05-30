import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '~/config/env';
import { web3 } from '~/contract';
import { User } from '~/models';
import { UserData } from '~/type';
import { HTTP_STATUS, formatOrderNumber } from '~/utils';

interface SuccessResponse {
  user: UserData;
  access_token?: string;
}

interface MessageResponse {
  message: string;
}

const AuthController = {
  signIn: async (req: Request, res: Response<SuccessResponse | MessageResponse>) => {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
      return;
    }
    try {
      const user = await User.findOne({ email }).exec();
      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found!' });
        return;
      }

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Password is invalid!' });
        return;
      }

      const token = await jwt.sign({ id: user.id }, env.JWT_SECRET_KEY, {
        expiresIn: '10h',
      });

      const { password: _, ...result } = user.toObject();
      res.status(HTTP_STATUS.OK).json({
        user: result,
        access_token: token,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },

  signUp: async (req: Request, res: Response<MessageResponse>) => {
    const { full_name, email, password } = req.body;
    if (!(email && full_name && password)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
    }
    try {
      const isAlready = await User.findOne({ email }).exec();
      if (isAlready) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Email đã được sử dụng!' });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // * Create Blockchain Wallet Address
      const address = await web3.eth.personal.newAccount(hashedPassword);
      if (!address) {
        res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Create wallet failed!' });
      }
      //* Deposit 6M to new wallet
      const tx = await web3.eth.sendTransaction({
        from: env.DEFAULT_ADDRESS,
        to: address,
        value: 6000000, //* default gas limit
      });
      console.info('Transaction: ', tx.transactionHash);

      //* Save to database
      const accountCount = await User.countDocuments();
      const newAccount = await new User({
        order_id: formatOrderNumber('MA', accountCount + 1),
        email,
        password: hashedPassword,
        full_name,
        wallet: address,
      });
      await newAccount.save();

      res.status(HTTP_STATUS.CREATED).json({
        message: 'Đăng ký thành công!\n Vui lòng đăng nhập để tiếp tục!',
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },

  getMe: async (req: Request, res: Response<SuccessResponse | MessageResponse>) => {
    const { userID } = req.body;
    if (!userID) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
      return;
    }
    try {
      const user = await User.findById(userID).exec();
      if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized!' });
        return;
      }
      // delete password field from user object
      const { password: _, ...result } = user.toObject();
      res.status(HTTP_STATUS.OK).json({ user: result });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
    }
  },
};

export default AuthController;
