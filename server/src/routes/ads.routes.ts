import { Router } from "express";
import { prisma } from "../server";

const adsRoutes = Router();

adsRoutes.get("/:id/discord", async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  res.json({
    discord: ad.discord,
  });
});

export { adsRoutes };
