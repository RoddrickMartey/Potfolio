import { prisma } from "../utils/prisma.js";

export const getHomePage = async (req, res) => {
  try {
    const USERID = parseInt(process.env.USERID);

    const homeInfo = await prisma.user.findFirst({
      where: { id: USERID },
      select: { name: true },
    });
    return res.status(200).json(homeInfo);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

export const getAboutPage = async (req, res) => {
  try {
    const USERID = parseInt(process.env.USERID);
    const user = await prisma.user.findFirst({
      where: { id: USERID },
      select: {
        name: true,
        bio: true,
        skills: { select: { skill: true } },
      },
    }); // assuming single user system
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

export const getContactPage = async (req, res) => {
  try {
    const USERID = parseInt(process.env.USERID);
    const user = await prisma.user.findFirst({
      where: { id: USERID },
      select: {
        name: true,
        phoneNumbers: { select: { number: true } },
        socialLinks: { select: { platform: true, url: true } },
        email: true,
      },
    }); // assuming single user system
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

export const getProjectsPage = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        screenshots: true,
        _count: {
          select: { comments: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};
