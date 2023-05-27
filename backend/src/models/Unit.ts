import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { UnitModel } from '~/type';

const UnitSchema = new Schema<UnitModel>(
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  schemaOptions
);

export default model('units', UnitSchema);
