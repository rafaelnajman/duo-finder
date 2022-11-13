import { Router } from "express";
import { gamesRoutes } from "./games.routes";
const router = Router();

router.use("/", gamesRoutes);

export default router;
