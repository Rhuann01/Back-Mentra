import { Router } from "express";
import {
  geminiController,
  chanlegerController,
} from "../controllers/gemini-controller.js";


const router = new Router();
router.post("/gerarRes", geminiController);
router.post("/gerarDesafio", chanlegerController);

export default router;
