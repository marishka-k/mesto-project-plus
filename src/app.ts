import * as dotenv from 'dotenv';
import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import { celebrate, errors } from 'celebrate';
import router from './routes/index';
import auth from './middlewares/auth';
import { errorLogger, requestLogger } from './middlewares/logger';
import { signinJoiObj, signupJoiObj } from './utils/utils';
import { createUser, login } from './controllers/users';

interface Error {
  statusCode: number,
  message: string,
}

dotenv.config();
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(requestLogger);
app.post('/signup', celebrate({ body: signupJoiObj }), createUser);
app.post('/signin', celebrate({ body: signinJoiObj }), login);
app.use(auth);
app.use('/', router);
app.use(errorLogger);
app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
