import { Request, Response } from 'express';
import { HTTP_STATUS } from '~/utils';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '~/config/env';
import { User } from '~/models';
import { formatOrderNumber } from '~/utils';
import { UserData, UserModel } from '~/type';

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

      // generate token
      const token = await jwt.sign({ id: user.id }, env.JWT_SECRET_KEY);
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
      // check if email is already in use
      const isAlready = await User.findOne({ email }).exec();
      if (isAlready) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Email đã được sử dụng!' });
        return;
      }

      // * Create Blockchain Wallet Address
      // const address = await web3.eth.personal.newAccount(password);
      // if (!address) {
      //   res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Create wallet failed!' });
      // }

      const accountCount = await User.countDocuments();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newAccount = await new User({
        order_id: formatOrderNumber('MA', accountCount + 1),
        email,
        password: hashedPassword,
        full_name,
        avatar: '',
        banner: '',
        description: '',
        phone: '',
        website: '',
        wallet: '0x2ba93c2496ce43eeb92b9f3f6c0f968e0dbc266d',
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
