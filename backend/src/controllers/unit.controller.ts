import { Request, Response } from 'express';
import { Unit } from '~/models';
import { HTTP_STATUS } from '~/utils';

const UnitController = {
  getUnitByType: async (req: Request, res: Response) => {
    const { type } = req.query;
    try {
      const results = await Unit.find({ type });
      res.status(HTTP_STATUS.OK).json({ data: results });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  createUnit: async (req: Request, res: Response) => {
    const { type, value } = req.body;
    try {
      const unit = new Unit({ type, value });
      await unit.save();
      res.status(HTTP_STATUS.CREATED).json({ message: 'OK' });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
};

export default UnitController;
