import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createCard, deleteCard, dislikeCard, getCards, likeCard,
} from '../controllers/cards';
import {
  createCardJoiObj, findCardJoiObj,
} from '../utils/utils';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate({ body: createCardJoiObj }), createCard);
cardsRouter.delete('/:cardId', celebrate({ params: findCardJoiObj }), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({ params: findCardJoiObj }), likeCard);
cardsRouter.delete('/:cardId/likes', celebrate({ params: findCardJoiObj }), dislikeCard);

export default cardsRouter;
