import LogoImg from "../assets/Logo.png";

import * as Dialog from "@radix-ui/react-dialog";

import { GameBanner } from "../components/GameBanner";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { useEffect, useState } from "react";

import { CreateAdModal } from "../components/CreateAdModal";
import axios from "axios";

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
    axios("http://localhost:3333/games").then((response) =>
      setGames(
        response.data.sort((a: Game, b: Game) => {
          if (a.index > b.index) {
            return 1;
          }
          if (a.index < b.index) {
            return -1;
          }
        })
      )
    );
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
      <div className="grid grid-flow-col auto-cols-[70%] sm:auto-cols-[20%] lg:auto-cols-[17%] overflow-x-auto scrollbar-invisible  gap-6 mt-16">
        {games.map((game, index) => {
          return (
            <GameBanner
              id={game.id}
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
