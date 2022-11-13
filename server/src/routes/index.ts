import { Router } from "express";
import { adsRoutes } from "./ads.routes";
import { gamesRoutes } from "./games.routes";

const router = Router();

router.use("/games", gamesRoutes);

router.use("/ads", adsRoutes);

export default router;
