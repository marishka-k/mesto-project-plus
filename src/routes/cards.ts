import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createCard, deleteCard, dislikeCard, getCards, likeCard,
} from '../controllers/cards';
import {
  createCardJoiObj, findCardJoiObj,
} from '../utils/utils';

const router = Router();

router.get('/', getCards);
router.post('/', celebrate({ body: createCardJoiObj }), createCard);
router.delete('/:cardId', celebrate({ params: findCardJoiObj }), deleteCard);

router.put('/:cardId/likes', celebrate({ params: findCardJoiObj }), likeCard);
router.delete('/:cardId/likes', celebrate({ params: findCardJoiObj }), dislikeCard);

export default router;
