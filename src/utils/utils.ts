import { Request } from 'express';
import { ObjectId } from 'mongoose';

// eslint-disable-next-line no-useless-escape
export const linkExpression = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;

export interface TempRequest extends Request {
  user?: { _id: ObjectId };
}
