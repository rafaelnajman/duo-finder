import Router from "express";
import { prisma } from "../server";
import { convertHourStringToMinutes } from "../utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "../utils/convert-minutes-to-hour-string";
import { getTwitchGames } from "../utils/get-twitch-games";

const gamesRoutes = Router();

gamesRoutes.get("/", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  res.json(games);
});

gamesRoutes.post("/update-games", async (req, res) => {
  const games = await getTwitchGames();
  //update all database games index to 1000
  await prisma.game.updateMany({
    data: {
      index: 1000,
    },
  });
  games.forEach(async (game, index) => {
    const gameExists = await prisma.game.findUnique({
      where: {
        title: game.name,
      },
    });
    if (gameExists) {
      await prisma.game.update({
        where: {
          title: game.name,
        },
        data: {
          index: index,
        },
      });
    }
  });
  res.json({ message: "Games updated" });
});

gamesRoutes.post("/add", async (req, res) => {
  const { title, bannerUrl } = req.body;
  try {
    const game = await prisma.game.create({
      data: {
        index: 0,
        title: title,
        bannerUrl: bannerUrl,
      },
    });
    res.status(201).json(game);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

gamesRoutes.post("/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;
  try {
    await prisma.ad.create({
      data: {
        gameId,
        weekDays: body.weekDays.join(","),
        hourStart: convertHourStringToMinutes(body.hourStart),
        hourEnd: convertHourStringToMinutes(body.hourEnd),
        discord: body.discord,
        name: body.name,
        useVoiceMail: body.useVoiceMail,
        yearsPlaying: body.yearsPlaying,
      },
    });
    res.status(201).json(body);
  } catch (err) {
    res.status(400).json(err);
  }
});

gamesRoutes.get("/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      discord: true,
      name: true,
      weekDays: true,
      useVoiceMail: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },

    where: {
      gameId: gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(
    ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }))
  );
});

gamesRoutes.get("/ads/:id/discord", async (req, res) => {
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
export { gamesRoutes };
