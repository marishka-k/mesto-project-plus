import { Router } from 'express';

import {
  getUsers,
  getUserById,
  getUserInfo,
  updateUser,
  updateAvatar,
  createUser,
} from '../controllers/users';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/me', getUserInfo);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
