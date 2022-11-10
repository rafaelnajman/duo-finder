import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
export function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8 rounder-lg bg-nlw-gradient overflow-hidden self-stretch rounded-lg">
      <div className="bg-[#2A2634] rounded-lg px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black ">
            Do you want to play with me?
          </strong>
          <span className="text-zinc-400 block">
            Publish your ad and find the perfect duo for you!
          </span>
        </div>

        <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3 ">
          <MagnifyingGlassPlus size={24} />
          Publish an ad
        </Dialog.Trigger>
      </div>
    </div>
  );
}
