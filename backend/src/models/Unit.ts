import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { IUnit } from '~/type';

const UnitSchema = new Schema<IUnit>(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  schemaOptions
);

export default model('units', UnitSchema);
