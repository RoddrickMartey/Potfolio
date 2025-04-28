import { prisma } from "../utils/prisma.js";
import { phoneNumberSchema } from "../schemas/userSchema.js";

// Add phone number
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
    const newPhoneNumber = await prisma.phonenumber.create({
      // Model name is phonenumber (not phoneNumber)
      data: {
        ...value,
        userId,
      },
      select: {
        id: true,
        number: true,
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

// Update phone number
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
    const phoneNumber = await prisma.phonenumber.findUnique({
      // Model name is phonenumber (not phoneNumber)
      where: { id: phoneNumberId },
    });

    if (!phoneNumber || phoneNumber.userId !== userId) {
      return res.status(404).json({ error: "Phone number not found" });
    }

    const updatedPhoneNumber = await prisma.phonenumber.update({
      where: { id: phoneNumberId },
      data: value,
      select: {
        id: true,
        number: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(updatedPhoneNumber);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Delete phone number
export const deletePhoneNumber = async (req, res) => {
  const phoneNumberId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    const phoneNumber = await prisma.phonenumber.findUnique({
      // Model name is phonenumber (not phoneNumber)
      where: { id: phoneNumberId },
    });

    if (!phoneNumber || phoneNumber.userId !== userId) {
      return res.status(404).json({ error: "Phone number not found" });
    }

    await prisma.phonenumber.delete({
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
