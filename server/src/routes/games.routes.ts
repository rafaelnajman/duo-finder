import Router from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "../utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "../utils/convert-minutes-to-hour-string";
import axios from "axios";
const prisma = new PrismaClient();
const gamesRoutes = Router();

interface gameResponse {
  id: string;
  name: string;
  box_art_url: string;
}
interface IAcessTokenResponse {
  access_token: string;
}

async function getTwitchGames(): Promise<gameResponse[]> {
  const url = "https://id.twitch.tv/oauth2/token";
  const { data } = await axios.post<IAcessTokenResponse>(url, {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "client_credentials",
  });
  const bearer = `Bearer ${data.access_token}`;
  const games = await axios.get("https://api.twitch.tv/helix/games/top", {
    headers: {
      Authorization: bearer,
      "Client-Id": process.env.CLIENT_ID,
    },
  });
  return games.data.data;
}

gamesRoutes.get("/games", async (req, res) => {
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

gamesRoutes.post("/games/add", async (req, res) => {
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

gamesRoutes.post("/games/:id/ads", async (req, res) => {
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

gamesRoutes.get("/games/:id/ads", async (req, res) => {
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
