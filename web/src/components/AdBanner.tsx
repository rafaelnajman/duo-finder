import * as Dialog from "@radix-ui/react-dialog";

import { GameController } from "phosphor-react";
import { CreateDiscordModal } from "./CreateDiscordModal";

interface AdBannerProps {
  name: string;
  yearsPlaying: number;
  weekDays: string;
  hourStart: number;
  hourEnd: number;
  useVoiceMail: boolean;
  id: string;
  onClick: () => void;
}

export function AdBanner(props: AdBannerProps) {
  return (
    <div className="h-[350px]  w-[280px] bg-[#2A2634] rounded-xl flex justify-between flex-col  text-zinc-100 p-8">
      <span className="flex justify-center items-start flex-col">
        <h1 className=" text-sm flex text-zinc-400 ">Name:</h1>
        <p className="">{props.name}</p>
      </span>
      <span className="flex justify-center items-start flex-col">
        <h1 className=" text-sm flex text-zinc-400 ">Years Playing:</h1>
        <p className="">{props.yearsPlaying}</p>
      </span>
      <span className="flex justify-center items-start flex-col">
        <h1 className=" text-sm flex text-zinc-400 ">When:</h1>
        <p className="">{`${props.weekDays.length} dias \u2022 ${props.hourStart} - ${props.hourEnd}`}</p>
      </span>
      <span className="flex justify-center items-start flex-col">
        <h1 className=" text-sm flex text-zinc-400 ">Use VOIP:</h1>
        <p
          className={`${
            props.useVoiceMail ? "text-green-300" : "text-red-300"
          }`}
        >
          {props.useVoiceMail ? "Yes" : "No"}
        </p>
      </span>
      <Dialog.Root>
        <Dialog.Trigger
          className="bg-violet-500 px-5 h-12 rounded-md  flex items-center justify-center gap-3 hover:bg-violet-600"
          type="submit"
        >
          <GameController size={24} />
          Connect
        </Dialog.Trigger>
        <CreateDiscordModal id={props.id} />
      </Dialog.Root>
    </div>
  );
}
