import Joi from "joi";

const id = Joi.string().hex().length(24).required();

export const updateNameSchema = {
  params: Joi.object({
    id,
  }),
  body: Joi.object({
    name: Joi.string().trim().min(1).max(100).pattern(/^[A-Za-z ]+$/).required(),
  }),
};

export const replaceUserSchema = {
  params: Joi.object({
    id,
  }),
  body: Joi.object({
    name: Joi.string().trim().min(1).max(100).pattern(/^[A-Za-z ]+$/).required(),
    age: Joi.number().integer().min(10).max(150).required(),
    email: Joi.string().trim().email().required(),
    address: Joi.string().trim().min(1).max(300).required(),
    password: Joi.string().min(6).max(128).pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,128}$/
  ).required(),
  }),
};

export const deleteUserSchema = {
  params: Joi.object({
    id,
  }),
};
