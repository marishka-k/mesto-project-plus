import { model, Schema } from 'mongoose';
import { linkExpression } from '../utils/utils';

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'User name required'],
    validate: {
      validator: (v: string) => v.length > 2 && v.length < 30,
      message: 'Длина текста должна быть от 2 до 30 символов',
    },
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: [true, 'User about required'],
    validate: {
      validator: (v: string) => v.length > 2 && v.length < 200,
      message: 'Длина текста должна быть от 2 до 200 символов',
    },
  },
  avatar: {
    type: String,
    required: [true, 'User avatar required'],
    validate: {
      validator: (v: string) => linkExpression.test(v),
      message: 'Некорректная ссылка',
    },
  },
});
export default model<IUser>('User', UserSchema);
