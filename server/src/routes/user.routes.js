import { Router } from "express";

import { registerUser, loginUser, logoutUser, dashboard, addPoints, leaderboard, leaderboardByRank } from "../controllers/user.controller.js";

import authenticateUser from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.post("/logout", authenticateUser, logoutUser);
router.get("/dashboard", authenticateUser, dashboard);
router.post("/addPoints", authenticateUser, addPoints);
router.get("/leaderboard", authenticateUser, leaderboard);
router.get("/leaderboardByRank", authenticateUser, leaderboardByRank);

export default router;