import { model, Schema, Types } from 'mongoose';
import { linkExpression } from '../utils/utils';
import user from './user';

interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: [Types.ObjectId];
  createdAt: Date;
}

const CardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => linkExpression.test(v),
      message: 'Некорректная ссылка',
    },
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true,
  },

  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: user }],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('card', CardSchema);
