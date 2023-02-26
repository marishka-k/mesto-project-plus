import { Response, NextFunction, Request } from 'express';

export interface IAppRequest extends Request {
  user?: {
    _id: String,
  };
}

export const requestIdHandler = (req: IAppRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '63f9ff8edf6ad091da98978d',
  };
  next();
};
