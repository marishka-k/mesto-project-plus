import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../utils/errors/not-found-error';
import User from '../models/user';
import ValidationRequestError from '../utils/errors/validation-error';
import { IAppRequest } from '../types/AppRequest';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.send({ data: user });
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new ValidationRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
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
  } catch (err) {
    if (err instanceof Error && err.name === 'CastError') {
      next(new ValidationRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

export const getUserInfo = async (req: IAppRequest, res: Response, next: NextFunction) => {
  const id = req.user!._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      next(new NotFoundError('Пользователь не найден'));
      return;
    }
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: IAppRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const id = req.user!._id;
  try {
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
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new ValidationRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

export const updateAvatar = async (req: IAppRequest, res: Response, next: NextFunction) => {
  const avatar = req.body;
  const id = req.user!._id;

  try {
    const userUpdateAvatar = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.send(userUpdateAvatar);
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new ValidationRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};
