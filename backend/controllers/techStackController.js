import { prisma } from "../utils/prisma.js";
import { techStackSchema } from "../schemas/userSchema.js";

// Add a tech stack to a project
export const addTechStack = async (req, res) => {
  const { category, skill } = req.body;
  const { projectId } = req.params;

  const { error, value } = techStackSchema.validate({ category, skill });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const newTechStack = await prisma.techstack.create({
      data: {
        category: value.category,
        skill: value.skill,
        projectId: Number(projectId),
      },
    });

    return res.status(201).json(newTechStack);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

// Update a tech stack
export const updateTechStack = async (req, res) => {
  const { category, skill } = req.body;
  const { techStackId } = req.params;

  const { error, value } = techStackSchema.validate({ category, skill });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const updatedTechStack = await prisma.techstack.update({
      where: { id: Number(techStackId) },
      data: { category: value.category, skill: value.skill },
    });

    return res.status(200).json(updatedTechStack);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

// Delete a tech stack
export const deleteTechStack = async (req, res) => {
  const { techStackId } = req.params;

  try {
    const deletedTechStack = await prisma.techstack.delete({
      where: { id: Number(techStackId) },
    });

    return res.status(200).json(deletedTechStack);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};
