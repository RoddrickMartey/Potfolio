import { prisma } from "../utils/prisma.js";
import { projectCreateSchema } from "../schemas/userSchema.js";

// Create Project
export const createProject = async (req, res) => {
  const { error, value } = projectCreateSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  const { title, description, category, techstack, link, screenshot } = value;

  try {
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        category,
        link,
        techstack: {
          create: techstack.map((tech) => ({
            category: tech.category,
            skill: tech.skill,
          })),
        },
        screenshot: {
          create: screenshot.map((screenshot) => ({
            url: screenshot.url,
          })),
        },
      },
      include: {
        techstack: true,
        screenshot: true,
      },
    });

    return res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

// Get all Projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        screenshot: true,
        _count: {
          select: { comment: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch projects." });
  }
};

// Get single Project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        techstack: true,
        screenshot: true,
        comment: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error fetching project" });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  const { id } = req.params;

  const { error, value } = projectCreateSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  const { title, description, category, techstack, link, screenshot } = value;

  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Delete old techStacks and screenshots (for full replace)
    await prisma.techstack.deleteMany({
      where: { project: { some: { id: parseInt(id) } } }, // Match the project ID in techstack deletion
    });
    await prisma.screenshot.deleteMany({ where: { projectId: parseInt(id) } });

    const updated = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        category,
        link,
        techstack: {
          create: techstack.map((tech) => ({
            category: tech.category,
            skill: tech.skill,
          })),
        },
        screenshot: {
          create: screenshot.map((screenshot) => ({
            url: screenshot.url,
          })),
        },
      },
      include: {
        techstack: true,
        screenshot: true,
      },
    });

    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update project" });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    await prisma.project.delete({ where: { id: parseInt(id) } });

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete project" });
  }
};
