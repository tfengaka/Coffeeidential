import { Request, Response } from 'express';
import { Unit } from '~/models';
import { HTTP_STATUS } from '~/utils';

const UnitController = {
  getUnitByType: async (req: Request, res: Response) => {
    const { type } = req.query;
    try {
      const units = await Unit.find({ type });
      const results = units.map((unit) => ({
        _id: unit._id,
        value: unit.value,
      }));
      res.status(HTTP_STATUS.OK).json({ data: results });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
  getUnitById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const unit = await Unit.findById({ _id: id });
      res.status(HTTP_STATUS.OK).json({
        _id: unit?._id,
        value: unit?.value,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },

  createUnit: async (req: Request, res: Response) => {
    const { type, value, userID } = req.body;
    try {
      const unit = new Unit({ type, value, createdBy: userID });
      await unit.save();
      res.status(HTTP_STATUS.CREATED).json({ message: 'OK' });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER).json({ message: 'Internal Server Error!' });
      console.error(error);
    }
  },
};

export default UnitController;
