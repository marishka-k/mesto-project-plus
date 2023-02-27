import { NextFunction, Request, Response } from 'express';
import ValidationRequestError from '../utils/errors/validation-error';
import NotFoundError from '../utils/errors/not-found-error';
import { IAppRequest } from '../types/AppRequest';

import Card from '../models/card';

export const createCard = async (req: IAppRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const ownerId = req.user!._id;

  try {
    const card = await Card.create({ name, link, owner: ownerId });
    res.send({ data: card });
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new ValidationRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);

    res.send({ data: cards });
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (req: IAppRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  try {
    const cardRemove = await Card.findByIdAndRemove(cardId);
    if (!cardRemove) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
      return;
    }
    res.send({ data: cardRemove });
  } catch (err) {
    if (err instanceof Error && err.name === 'CastError') {
      next(new ValidationRequestError('Карточка по указанному id не найдена'));
      return;
    }
    next(err);
  }
};

export const likeCard = async (req: IAppRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const ownerId = req.user!._id;

  try {
    if (!cardId) {
      next(new NotFoundError('Переданы некорректные данные для постановки лайка'));
      return;
    }
    const cardLike = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: ownerId } },
      { new: true },
    );
    if (!cardLike) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
      return;
    }
    res.send({ data: cardLike });
  } catch (err) {
    if (err instanceof Error && err.name === 'CastError') {
      next(new ValidationRequestError('Карточка по указанному id не найдена'));
      return;
    }
    next(err);
  }
};

export const dislikeCard = async (req: IAppRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  try {
    if (!cardId) {
      next(new NotFoundError('Переданы некорректные данные для постановки лайка'));
      return;
    }
    const cardDislike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user?._id } },
      { new: true },
    );
    if (!cardDislike) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
      return;
    }
    res.send(cardDislike);
  } catch (err) {
    if (err instanceof Error && err.name === 'CastError') {
      next(new ValidationRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};
