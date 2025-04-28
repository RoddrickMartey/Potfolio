import { socialLinkSchema } from "../schemas/userSchema.js";
import { prisma } from "../utils/prisma.js";

// Add a social link
export const addSocialLink = async (req, res) => {
  const socialLink = req.body;
  const userId = req.userId;

  const { error, value } = socialLinkSchema.validate(socialLink, {
    abortEarly: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res
      .status(400)
      .json({ error: `Invalid social link data: ${messages.join(", ")}` });
  }

  try {
    // Check if the social link already exists for this user
    const existingLink = await prisma.sociallink.findFirst({
      where: { userId, platform: value.platform }, // Prevent duplicate social links per user
    });

    if (existingLink) {
      return res
        .status(400)
        .json({ error: `Social link for ${value.platform} already exists` });
    }

    // Create the new social link with the userId
    const newSocialLink = await prisma.sociallink.create({
      data: { ...value, userId },
    });

    return res.status(201).json(newSocialLink); // Return the newly created social link
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// Update a social link
export const updateSocialLink = async (req, res) => {
  const { id } = req.params;
  const socialLink = req.body;
  const userId = req.userId;

  const { error, value } = socialLinkSchema.validate(socialLink, {
    abortEarly: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res
      .status(400)
      .json({ error: `Invalid social link data: ${messages.join(", ")}` });
  }

  try {
    const existingSocialLink = await prisma.sociallink.findUnique({
      where: { id: Number(id) }, // Cast ID to number here
    });

    if (!existingSocialLink) {
      return res.status(404).json({ error: "Social link not found" });
    }

    if (existingSocialLink.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this social link" });
    }

    const updatedSocialLink = await prisma.sociallink.update({
      where: { id: Number(id) }, // Cast ID to number here
      data: { ...value },
    });

    return res.status(200).json(updatedSocialLink);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// Delete a social link
export const deleteSocialLink = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const existingSocialLink = await prisma.sociallink.findUnique({
      where: { id: Number(id) }, // Cast ID to number here
    });

    if (!existingSocialLink) {
      return res.status(404).json({ error: "Social link not found" });
    }

    if (existingSocialLink.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this social link" });
    }

    await prisma.sociallink.delete({
      where: { id: Number(id) }, // Cast ID to number here
    });

    return res
      .status(200)
      .json({ message: "Social link deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// Get all social links
export const getAllSocialLinks = async (req, res) => {
  const userId = req.userId;

  try {
    const socialLinks = await prisma.sociallink.findMany({
      where: { userId },
      select: {
        id: true,
        platform: true,
        url: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(socialLinks);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
