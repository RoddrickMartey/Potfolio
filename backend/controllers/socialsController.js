import { socialLinkSchema } from "../schemas/userSchema.js";
import { prisma } from "../utils/prisma.js";

export const addSocialLink = async (req, res) => {
  const socialLink = req.body;
  const userId = req.userId; // assuming the userId is coming from the token

  const { error, value } = socialLinkSchema.validate(socialLink, {
    abortEarly: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    // Create the new social link with the userId
    const newSocialLink = await prisma.socialLink.create({
      data: {
        ...value, // Spread the validated values
        userId, // Add the userId from the token
      },
    });

    return res.status(201).json(newSocialLink); // Return the newly created social link
  } catch (error) {
    console.error(error); // Use 'error' to match the variable name
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

export const updateSocialLink = async (req, res) => {
  const { id } = req.params; // ID of the social link to update
  const socialLink = req.body; // Data to update the social link
  const userId = req.userId; // Get userId from the token

  const { error, value } = socialLinkSchema.validate(socialLink, {
    abortEarly: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    // Check if the social link exists and belongs to the user
    const existingSocialLink = await prisma.socialLink.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingSocialLink) {
      return res.status(404).json({ error: "Social link not found" });
    }

    if (existingSocialLink.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this social link" });
    }

    // Update the social link
    const updatedSocialLink = await prisma.socialLink.update({
      where: { id: parseInt(id) },
      data: {
        ...value, // Spread the validated values
      },
    });

    return res.status(200).json(updatedSocialLink);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

export const deleteSocialLink = async (req, res) => {
  const { id } = req.params; // ID of the social link to delete
  const userId = req.userId; // Get userId from the token

  try {
    // Check if the social link exists and belongs to the user
    const existingSocialLink = await prisma.socialLink.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingSocialLink) {
      return res.status(404).json({ error: "Social link not found" });
    }

    if (existingSocialLink.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this social link" });
    }

    // Delete the social link
    await prisma.socialLink.delete({
      where: { id: parseInt(id) },
    });

    return res
      .status(200)
      .json({ message: "Social link deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

export const getAllSocialLinks = async (req, res) => {
  const userId = req.userId; // Get userId from the token

  try {
    // Get all social links that belong to the authenticated user
    const socialLinks = await prisma.socialLink.findMany({
      where: { userId: userId }, // Filter by userId
      select: {
        id: true,
        platform: true,
        url: true,
        createdAt: true,
        updatedAt: true,
      }, // Select the fields you want to return
    });

    return res.status(200).json(socialLinks);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};
