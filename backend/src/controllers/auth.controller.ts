import { Request, Response } from 'express';
import { HTTP_STATUS } from '~/utils';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '~/config/env';
import { User, web3 } from '~/models';
import { formatOrderNumber } from '~/utils';

const AuthController = {
  signIn: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
    }
    try {
      const user = await User.findOne({
        email,
      }).exec();
      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found!' });
        return;
      }

      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Password is invalid!' });
        return;
      }

      // generate token
      const token = jwt.sign({ user }, env.JWT_SECRET_KEY);
      res.status(HTTP_STATUS.OK).json({
        user,
        access_token: token,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error });
    }
  },

  signUp: async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    if (!(email && fullName && password)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
    }
    try {
      // check if email is already in use
      const isAlready = await User.findOne({ email }).exec();
      if (isAlready) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Email is already in use!' });
        return;
      }

      const address = await web3.eth.personal.newAccount(password);
      if (!address) {
        res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Create wallet failed!' });
      }
      const accountCount = await User.countDocuments();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newAccount = await new User({
        displayID: formatOrderNumber('MA', accountCount + 1),
        email,
        password: hashedPassword,
        fullName,
        avatar: null,
        banner: null,
        description: null,
        phone: null,
        website: null,
        wallet: address,
      });
      await newAccount.save();

      res.status(HTTP_STATUS.CREATED).json({
        message: 'Register successfully, please login to continue!',
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ error });
    }
  },
};

export default AuthController;
