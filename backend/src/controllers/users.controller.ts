import { Request, Response } from 'express';
import { User } from '~/models';
import { HTTP_STATUS } from '~/utils';

const UserController = {
  updateAccountInfo: async (req: Request, res: Response) => {
    const { full_name, description, userID } = req.body;
    if (!(full_name && description)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
      return;
    }
    try {
      const user = await User.findByIdAndUpdate(userID, { $set: { full_name, description } }, { new: true });
      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found!' });
        return;
      }
      const { password: _, ...result } = user.toObject();
      res.status(HTTP_STATUS.OK).json({ user: result });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  updateBrandInfo: async (req: Request, res: Response) => {
    const { avatar, banner, userID } = req.body;
    if (!(avatar && banner)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Bad Request!' });
      return;
    }
    try {
      const user = await User.findByIdAndUpdate(userID, { $set: { avatar, banner } }, { new: true });
      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found!' });
        return;
      }
      const { password: _, ...result } = user.toObject();
      res.status(HTTP_STATUS.OK).json({ user: result });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  updateContactInfo: async (req: Request, res: Response) => {
    const { address, phone, website, userID } = req.body;
    try {
      const user = await User.findByIdAndUpdate(userID, { $set: { address, website, phone } }, { new: true });
      if (!user) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found!' });
        return;
      }
      const { password: _, ...result } = user.toObject();
      res.status(HTTP_STATUS.OK).json({ user: result });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  // changePassword: async (req: Request, res: Response) => {},
};

export default UserController;
