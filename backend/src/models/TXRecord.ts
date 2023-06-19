import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { TXRecordModel } from '~/type';

const TXRecord = new Schema<TXRecordModel>(
  {
    topic: {
      type: String,
      required: true,
    },
    tx_hash: {
      type: String,
      required: true,
    },
    receipt: {
      type: Object,
    },
  },
  schemaOptions
);

export default model('tx_records', TXRecord);
