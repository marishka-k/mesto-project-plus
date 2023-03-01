import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getUsers, getUserById, getUserInfo, updateUser, updateAvatar,
} from '../controllers/users';
import {
  findUserJoiObj, updateAvatarJoiObj, updateUserJoiObj,
} from '../utils/utils';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', celebrate({ params: findUserJoiObj }), getUserById);
userRouter.get('/me', getUserInfo);

userRouter.patch('/me', celebrate({ body: updateUserJoiObj }), updateUser);
userRouter.patch('/me/avatar', celebrate({ body: updateAvatarJoiObj }), updateAvatar);

export default userRouter;
