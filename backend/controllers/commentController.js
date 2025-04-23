import { prisma } from "../utils/prisma.js";
import { commentSchema } from "../schemas/userSchema.js";

// Add a comment to a project
export const addComment = async (req, res) => {
  const { content } = req.body;
  const { projectId } = req.params;

  const { error, value } = commentSchema.validate({ content });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content: value.content,
        projectId: Number(projectId),
      },
    });

    return res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: Number(commentId) },
    });

    return res.status(200).json(deletedComment);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};
