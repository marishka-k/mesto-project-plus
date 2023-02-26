import * as dotenv from 'dotenv';
import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { requestIdHandler } from './types/AppRequest';
import router from './routes/index';
import { errorLogger } from './middleware/errorLogger';

interface Error {
  statusCode: number,
  message: string,
}

dotenv.config();
const { PORT = 3000 } = process.env;

const app = express();
app.use(requestIdHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');
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
