import {
  Response,
  Request,
  NextFunction,
  Router,
} from 'express';

import userRouter from './users';
import cardsRouter from './cards';
import NotFoundError from '../utils/errors/not-found-error';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

export default router;
