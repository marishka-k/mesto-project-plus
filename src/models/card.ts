import { model, Schema, Types } from 'mongoose';
import { linkExpression } from '../utils/utils';

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
    validate: {
      validator: (v: string) => v.length > 2 && v.length < 30,
      message: 'Длина текста должна быть от 2 до 30 символов',
    },
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
    ref: 'user',
    required: true,
  },

  likes: {
    type: [Types.ObjectId],
    default: [],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('Card', CardSchema);
