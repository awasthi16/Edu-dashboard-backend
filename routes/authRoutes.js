import express from "express";
import { signup, login, getProfile } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Protected route (any logged-in user)
router.get("/profile", protect, getProfile);

// Example of role-based route
router.get("/admin", protect, authorizeRoles("owner", "manager"), (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}. You have admin access.` });
});

export default router;
