import { prisma } from "../utils/prisma.js";
import { phoneNumberSchema } from "../schemas/userSchema.js";

export const addPhoneNumber = async (req, res) => {
  const phoneNumber = req.body;
  const userId = req.userId;

  const { error, value } = phoneNumberSchema.validate(phoneNumber, {
    abortEarly: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const newPhoneNumber = await prisma.phoneNumber.create({
      data: {
        ...value,
        userId,
      },
      select: {
        id: true,
        number: true,
        type: true,
        createdAt: true,
      },
    });

    return res.status(201).json(newPhoneNumber);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

export const updatePhoneNumber = async (req, res) => {
  const phoneNumberId = parseInt(req.params.id);
  const userId = req.userId;
  const updates = req.body;

  const { error, value } = phoneNumberSchema.validate(updates, {
    abortEarly: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const phoneNumber = await prisma.phoneNumber.findUnique({
      where: { id: phoneNumberId },
    });

    if (!phoneNumber || phoneNumber.userId !== userId) {
      return res.status(404).json({ error: "Phone number not found" });
    }

    const updatedPhoneNumber = await prisma.phoneNumber.update({
      where: { id: phoneNumberId },
      data: value,
      select: {
        id: true,
        number: true,
        type: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(updatedPhoneNumber);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const deletePhoneNumber = async (req, res) => {
  const phoneNumberId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    const phoneNumber = await prisma.phoneNumber.findUnique({
      where: { id: phoneNumberId },
    });

    if (!phoneNumber || phoneNumber.userId !== userId) {
      return res.status(404).json({ error: "Phone number not found" });
    }

    await prisma.phoneNumber.delete({
      where: { id: phoneNumberId },
    });

    return res
      .status(200)
      .json({ message: "Phone number deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
