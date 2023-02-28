import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getUsers, getUserById, getUserInfo, updateUser, updateAvatar,
} from '../controllers/users';
import {
  findUserJoiObj, updateAvatarJoiObj, updateUserJoiObj,
} from '../utils/utils';

const router = Router();

router.get('/', getUsers);
router.get('/:id', celebrate({ params: findUserJoiObj }), getUserById);
router.get('/me', getUserInfo);

router.patch('/me', celebrate({ body: updateUserJoiObj }), updateUser);
router.patch('/me/avatar', celebrate({ body: updateAvatarJoiObj }), updateAvatar);

export default router;
