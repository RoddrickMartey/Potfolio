import { prisma } from "../utils/prisma.js";
import { skillSchema } from "../schemas/userSchema.js";

// Add a skill
export const addSkill = async (req, res) => {
  const skill = req.body;
  const userId = req.userId;

  const { error, value } = skillSchema.validate(skill, { abortEarly: true });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res
      .status(400)
      .json({ error: `Invalid skill data: ${messages.join(", ")}` });
  }

  try {
    // Optional: Check if skill already exists
    // const existingSkill = await prisma.skill.findFirst({ where: { userId, name: value.name } });
    // if (existingSkill) {
    //   return res.status(400).json({ error: "Skill already exists" });
    // }

    const newSkill = await prisma.skill.create({
      data: { ...value, userId },
    });

    return res.status(201).json(newSkill); // 201 Created
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

// Update a skill
export const updateSkill = async (req, res) => {
  const skillId = parseInt(req.params.id);
  const userId = req.userId;
  const updates = req.body;

  const { error, value } = skillSchema.validate(updates, { abortEarly: true });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res
      .status(400)
      .json({ error: `Invalid skill data: ${messages.join(", ")}` });
  }

  try {
    const skill = await prisma.skill.findUnique({ where: { id: skillId } });

    if (!skill || skill.userId !== userId) {
      return res
        .status(404)
        .json({ error: "Skill not found or does not belong to you" });
    }

    const updatedSkill = await prisma.skill.update({
      where: { id: skillId },
      data: value,
    });

    return res.status(200).json(updatedSkill);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
  const skillId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    const skill = await prisma.skill.findUnique({ where: { id: skillId } });

    if (!skill || skill.userId !== userId) {
      return res
        .status(404)
        .json({ error: "Skill not found or does not belong to you" });
    }

    await prisma.skill.delete({ where: { id: skillId } });

    return res.status(200).json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};
