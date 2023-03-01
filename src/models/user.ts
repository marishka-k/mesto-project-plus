import {
  model, Schema, Model, Document,
} from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import AuthError from '../utils/errors/auth-error';

import { linkExpression } from '../utils/utils';

interface IUser {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string,
}

interface UserModel extends Model<IUser> {
  // eslint-disable-next-line max-len, no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<any, any, IUser>>
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v: string) => linkExpression.test(v),
      message: 'Некорректная ссылка',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: any) => isEmail(v),
      message: 'Некорректный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
});

UserSchema.static('findUserByCredentials', async function findUserByCredentials(email: string, password: string) {
  const user: IUser = await this.findOne({ email }).select('+password');
  const matched = await bcrypt.compare(password, user.password);
  if (!user) {
    return new AuthError('Неправильные почта или пароль');
  }
  if (!matched) {
    return new Error('Неправильные почта или пароль');
  }
  return user;
});

export default model<IUser, UserModel>('user', UserSchema);
