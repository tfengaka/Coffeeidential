import { NextFunction, Response, Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import env from '~/config/env';
import { User } from '~/models';
import { HTTP_STATUS } from '~/utils';

interface TokenDecoded {
  id: string;
  iat: number;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const beartoken = req.headers.authorization;
  if (beartoken) {
    const token = beartoken.split(' ')[1];
    try {
      const tokenDecoded = verify(token, env.JWT_SECRET_KEY) as TokenDecoded;
      if (tokenDecoded) {
        req.body.userID = tokenDecoded.id;
        next();
      }
    } catch (error) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized!' });
      return;
    }
  } else {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized!' });
    return;
  }
};

export default verifyToken;
