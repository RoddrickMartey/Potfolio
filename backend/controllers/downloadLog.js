import { prisma } from "../utils/prisma.js";
import { downloadLogSchema } from "../schemas/userSchema.js";

// Log a file download
export const logDownload = async (req, res) => {
  const { fileUrl, ipAddress, userAgent } = req.body;

  const { error, value } = downloadLogSchema.validate({
    fileUrl,
    ipAddress,
    userAgent,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const newDownloadLog = await prisma.downloadlog.create({
      // Adjusted to match Prisma model case
      data: {
        fileUrl: value.fileUrl,
        ipAddress: value.ipAddress,
        userAgent: value.userAgent,
      },
    });

    // Respond with the newly created log entry
    return res.status(201).json(newDownloadLog); // Send the log entry in the response
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};
