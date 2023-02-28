import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthError from '../utils/errors/auth-error';

const { JWT_SECRET = 'secret-key' } = process.env;

interface SessionRequest extends Request {
  user?: string | JwtPayload
}

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthError('Требуется авторизация'));
  }

  const token = extractBearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError('Требуется авторизация'));
  }

  req.user = payload;
  next();

  return null;
};
