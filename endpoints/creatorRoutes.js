import express from "express";

import {
  createCardController,
  getCardController,
  deleteCardController,
  getAllCardsController,
} from "../controllers/creatorCard.Controller.js";

const router = express.Router();

router.post("/creator-cards", createCardController);
router.get("/creator-cards/:slug", getCardController);
router.delete("/creator-cards/:slug", deleteCardController);
router.get("/creator-cards", getAllCardsController);

export default router;