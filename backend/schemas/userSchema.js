import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(8).required(),
  password: {},
});
