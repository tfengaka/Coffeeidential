import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { DiaryModel } from '~/type';

const DiarySchema = new Schema<DiaryModel>({}, schemaOptions);

export default model('diaries', DiarySchema);
