import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { Joi } from 'celebrate';

export const linkExpression = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

export interface IAppRequest extends Request {
  user?: { _id: ObjectId };
}

export const signupJoiObj = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().pattern(linkExpression),

});

export const signinJoiObj = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

export const findUserJoiObj = Joi.object().keys({
  userId: Joi.string().length(24).hex(),
});

export const updateUserJoiObj = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().required().min(2).max(30),
});

export const updateAvatarJoiObj = Joi.object().keys({
  avatar: Joi.string().required().pattern(linkExpression),
});

export const createCardJoiObj = Joi.object().keys({
  name: Joi.string().min(2).max(30),
  link: Joi.string().required().pattern(linkExpression),
});

export const findCardJoiObj = Joi.object().keys({
  cardId: Joi.string().length(24).hex(),
});
