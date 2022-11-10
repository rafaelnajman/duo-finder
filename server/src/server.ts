import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import axios from "axios";

import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";
const prisma = new PrismaClient();

const app = express();
app.use(cors());

app.use(express.json());

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
});

interface IAcessTokenResponse {
  access_token: string;
}

app.post("/add-games", async (req, res) => {
  let { gameName } = req.body;
  gameName = gameName.toLowerCase();
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
  try {
    games.data.data.forEach(async (game: any, idx: number) => {
      // if (
      //   game.name == "Just Chatting" ||
      //   game.name == "Music" ||
      //   game.name == "Crypto" ||
      //   game.name == "Sports"
      // ) {
      //   return;
      // }
      if (await prisma.game.findFirst({ where: { id: game.id } })) {
        await prisma.game.update({
          where: {
            id: game.id,
          },
          data: {
            index: idx,
            bannerUrl: game.box_art_url
              .replace("{width}", "285")
              .replace("{height}", "380"),
            title: game.name,
          },
        })
      } else if (game.name.toLowerCase().includes(gameName)) {
        await prisma.game.create({
          data: {
            index: idx,
            id: game.id,
            bannerUrl: game.box_art_url
              .replace("{width}", "285")
              .replace("{height}", "380"),
            title: game.name,
          },
        });
      }
    });

  } catch (err) {
    res.json(err);
  }
});
app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

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
});

app.get("/ads", (req: Request, res: Response) => {
  res.status(201).send();
});

app.get("/games/:id/ads", async (req, res) => {
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

app.get("/ads/:id/discord", async (req, res) => {
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

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
