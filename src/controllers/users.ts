/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import ValidationRequestError from '../utils/errors/validation-error';
import NotFoundError from '../utils/errors/not-found-error';
import User from '../models/user';
import { TempRequest } from '../utils/utils';
import InternalError from '../utils/errors/internal-error';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  try {
    if (!name || !about || !avatar) {
      next(new ValidationRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    const user = await User.create({ name, about, avatar });
    res.send({ data: user });
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }
    res.send({ data: user });
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};

export const getUserInfo = async (req: TempRequest, res: Response, next: NextFunction) => {
  const id = req.user?._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }
    res.send({ data: user });
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};

export const updateUser = async (req: TempRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const id = req.user?._id;
  try {
    if (!name || !about) {
      next(new ValidationRequestError('Переданы некорректные данные при обновлении профиля'));
      return;
    }
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!userUpdate) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }
    res.send(userUpdate);
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};

export const updateAvatar = async (req: TempRequest, res: Response, next: NextFunction) => {
  const avatar = req.body;
  const id = req.user?._id;

  try {
    if (!avatar) {
      next(new ValidationRequestError('Переданы некорректные данные при обновлении аватара'));
      return;
    }

    const userUpdateAvatar = await User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true });
    if (!userUpdateAvatar) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }

    res.send(userUpdateAvatar);
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};
