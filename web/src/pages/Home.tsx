import LogoImg from "../assets/Logo.png";

import * as Dialog from "@radix-ui/react-dialog";

import { GameBanner } from "../components/GameBanner";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { useEffect, useState } from "react";

import { CreateAdModal } from "../components/CreateAdModal";
import api from "../services/api";

interface Game {
  index: number;
  id: number;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    api("games").then((response) => {
      console.log(response);
      setGames(
        response.data.sort((a: Game, b: Game) => {
          if (a.index > b.index) {
            return 1;
          }
          if (a.index < b.index) {
            return -1;
          }
        })
      );
    });
  }, []);
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={LogoImg} alt="Logo" className="h-[160px] w-[260px]" />

      <h1 className="text-6xl text-white font-black mt-20">
        Your{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        is waiting
      </h1>
      <div className="grid grid-cols-6 overflow-x-auto scrollbar  gap-6 mt-16">
        {games.map((game, index) => {
          if (index > 5) {
            return null;
          }
          return (
            <GameBanner
              id={game.id}
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

//grid grid-flow-col auto-cols-[20%]  gap-6 mt-16
