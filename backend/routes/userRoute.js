import { Router } from "express";
import {
  createUser,
  getMe,
  login,
  logout,
  updateUser,
} from "../controllers/userController.js";
import { validateToken } from "../middlewares/validateToken.js";
import {
  addPhoneNumber,
  deletePhoneNumber,
  updatePhoneNumber,
} from "../controllers/phoneController.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/projectController.js";
import {
  addSocialLink,
  deleteSocialLink,
  getAllSocialLinks,
  updateSocialLink,
} from "../controllers/socialsController.js";
import {
  addTechStack,
  deleteTechStack,
  updateTechStack,
} from "../controllers/techStackController.js";
import {
  addSkill,
  deleteSkill,
  updateSkill,
} from "../controllers/skillcontroller.js";
import {
  addScreenshot,
  updateScreenshot,
  deleteScreenshot,
} from "../controllers/screenShotControllers.js";
import { deleteComment } from "../controllers/commentController.js";

const router = Router();

router.post("/create", createUser);
router.post("/login", login);
router.post("/logout", logout);

router.use(validateToken);

// Basic Info Route
router.get("/me", getMe);
router.put("/update", updateUser);

// Phone Number Route
router.post("/addPhoneNumber", addPhoneNumber);
router.put("/updatePhoneNumber/:id", updatePhoneNumber);
router.delete("/deletePhoneNumber/:id", deletePhoneNumber);

// Project Route
router.get("/allProject", getAllProjects);
router.get("/project/:id", getProjectById);
router.post("/addProject", createProject);
router.put("/updateProject/:id", updateProject);
router.delete("/deleteProject/:id", deleteProject);

// SocialLink Route
router.get("/getSocial", getAllSocialLinks);
router.post("/addSocial", addSocialLink);
router.put("/updateSocial/:id", updateSocialLink);
router.delete("/deleteSocial/:id", deleteSocialLink);

// TechStack Route
router.post("/createTechStack/:projectId", addTechStack);
router.put("/updateTechStack/:techStackId", updateTechStack);
router.delete("/deleteTechStack/:techStackId", deleteTechStack);

// Skill Route
router.post("/addSkill", addSkill);
router.put("/updateSkill/:id", updateSkill);
router.delete("/deleteSkill/:id", deleteSkill);

// Screenshot Route
router.post("/addScreenshot/:projectId", addScreenshot);
router.put("/updateScreenshot/:screenshotId", updateScreenshot);
router.delete("/deleteScreenshot/:screenshotId", deleteScreenshot);

// Comment Route
router.delete("/deleteComment/:commentId", deleteComment);

export default router;
