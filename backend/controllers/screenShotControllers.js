import { prisma } from "../utils/prisma.js";
import { screenshotSchema } from "../schemas/userSchema.js";

// Add a screenshot to a project
export const addScreenshot = async (req, res) => {
  const { url } = req.body;
  const { projectId } = req.params;

  const { error, value } = screenshotSchema.validate({ url });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const newScreenshot = await prisma.screenshot.create({
      data: {
        url: value.url,
        projectId: Number(projectId),
      },
    });

    return res.status(201).json(newScreenshot);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

// Update a screenshot
export const updateScreenshot = async (req, res) => {
  const { url } = req.body;
  const { screenshotId } = req.params;

  const { error, value } = screenshotSchema.validate({ url });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const updatedScreenshot = await prisma.screenshot.update({
      where: { id: Number(screenshotId) },
      data: { url: value.url },
    });

    return res.status(200).json(updatedScreenshot);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

// Delete a screenshot
export const deleteScreenshot = async (req, res) => {
  const { screenshotId } = req.params;

  try {
    const deletedScreenshot = await prisma.screenshot.delete({
      where: { id: Number(screenshotId) },
    });

    return res.status(200).json(deletedScreenshot);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};
