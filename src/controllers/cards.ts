import { NextFunction, Request, Response } from 'express';
import ValidationRequestError from '../utils/errors/validation-error';
import NotFoundError from '../utils/errors/not-found-error';
import InternalError from '../utils/errors/internal-error';
import { TempRequest } from '../utils/utils';
import Card from '../models/card';

export const createCard = async (req: TempRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  try {
    if (!name || !link) {
      next(new ValidationRequestError('Переданы некорректные данные при создании карточки'));
      return;
    }
    const card = await Card.create({ name, link });
    res.send({ data: card });
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};

export const deleteCard = async (req: TempRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  try {
    const cardRemove = await Card.findById(cardId);
    if (!cardRemove) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
      return;
    }
    await Card.deleteOne({ _id: cardId });
    res.send({ data: cardRemove });
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};

export const likeCard = async (req: TempRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = req.user?._id;
  try {
    if (!cardId) {
      next(new NotFoundError('Переданы некорректные данные для постановки лайка'));
      return;
    }
    const cardLike = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: id } },
      { new: true, runValidators: true },
    );
    if (!cardLike) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
      return;
    }
    res.send({ data: cardLike });
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};

export const dislikeCard = async (req: TempRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const id = req.user!._id;

  try {
    if (!cardId) {
      next(new NotFoundError('Переданы некорректные данные для постановки лайка'));
      return;
    }
    const cardDislike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: id } },
      { new: true, runValidators: true },
    );
    if (!cardDislike) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
      return;
    }
    res.send(cardDislike);
  } catch {
    next(new InternalError('На сервере произошла ошибка'));
  }
};
