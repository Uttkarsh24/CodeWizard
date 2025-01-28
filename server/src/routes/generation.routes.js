import { Router } from "express";
import { generateQuiz, generateScramble } from "../controllers/generation.controller.js";

const router = Router();

router.get("/generateQuiz", generateQuiz);
router.get("/generateScramble", generateScramble);

export default router;