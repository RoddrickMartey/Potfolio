import { Router } from "express";
import {
  getAboutPage,
  getContactPage,
  getHomePage,
  getProjectsPage,
} from "../controllers/visitorController.js";
import { getProjectById } from "../controllers/projectController.js";
import { addComment } from "../controllers/commentController.js";
import { trackVisitor } from "../middlewares/visitorToken.js";

const router = Router();

// Middleware to track visitors (e.g., generate a token or log activity)
router.use(trackVisitor);

// Visitor routes
router.get("/home", getHomePage);
router.get("/about", getAboutPage);
router.get("/contact", getContactPage);
router.get("/projects", getProjectsPage);

// Project details & comments
router.get("/project/:id", getProjectById);
router.post("/comment/:projectId", addComment);

// Export router
export default router;
