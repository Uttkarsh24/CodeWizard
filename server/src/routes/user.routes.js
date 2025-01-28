import { Router } from "express";

import { registerUser, loginUser, logoutUser, dashboard, addPoints } from "../controllers/user.controller.js";

import authenticateUser from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.post("/logout", authenticateUser, logoutUser);
router.get("/dashboard", authenticateUser, dashboard);
router.post("/addPoints", authenticateUser, addPoints);

export default router;