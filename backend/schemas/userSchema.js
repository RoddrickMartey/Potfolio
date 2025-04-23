import Joi from "joi";

export const userCreateSchema = Joi.object({
  username: Joi.string().alphanum().min(8).required(),
  name: Joi.string().min(2).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]{3,30}$"
      )
    )
    .required(),
  email: Joi.string().email().required(),
  resume: Joi.string().uri().trim().required(),
  bio: Joi.string().min(10).max(1000).required(),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().alphanum().min(8).required(),
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  resume: Joi.string().uri().trim().required(),
  bio: Joi.string().min(10).max(1000).required(),
});

export const socialLinkSchema = Joi.object({
  platform: Joi.string()
    .valid("GitHub", "LinkedIn", "Twitter", "Facebook", "Instagram", "Other")
    .required(),
  url: Joi.string().uri().required(),
});

export const phoneNumberSchema = Joi.object({
  number: Joi.number().positive().required(),
});

export const skillSchema = Joi.object({
  skill: Joi.string().min(10).max(200).required(),
});

export const projectCreateSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string()
    .valid(
      "PERSONAL",
      "CLIENT",
      "SCHOOL",
      "WORK",
      "HACKATHON",
      "OPEN_SOURCE",
      "FREELANCE",
      "OTHER"
    )
    .required(),
  techStacks: Joi.array()
    .items(
      Joi.object({
        category: Joi.string()
          .valid(
            "FRONTEND",
            "BACKEND",
            "DATABASE",
            "DEVOPS",
            "MOBILE",
            "TOOLS",
            "TESTING",
            "DESIGN",
            "OFFICE",
            "OTHER"
          )
          .required(),
        skill: Joi.string().min(1).required(),
      })
    )
    .min(1)
    .required(),
  link: Joi.string().uri().required(),
  screenshots: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
      })
    )
    .min(1)
    .required(),
});

export const commentSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required(),
});

export const techStackSchema = Joi.object({
  category: Joi.string()
    .valid(
      "FRONTEND",
      "BACKEND",
      "DATABASE",
      "DEVOPS",
      "MOBILE",
      "TOOLS",
      "TESTING",
      "DESIGN",
      "OFFICE",
      "OTHER"
    )
    .required(),
  skill: Joi.string().min(1).required(),
});

export const screenshotSchema = Joi.object({
  url: Joi.string().uri().required(),
});

export const downloadLogSchema = Joi.object({
  fileUrl: Joi.string().uri().required(),
  ipAddress: Joi.string().ip().required(),
  userAgent: Joi.string().required(),
});

export const visitorSchema = Joi.object({
  token: Joi.string().required(),
  userAgent: Joi.string().required(),
  ipAddress: Joi.string().ip().required(),
});
