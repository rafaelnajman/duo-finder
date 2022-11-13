import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import api from "../services/api";

interface createDiscordModalProps {
  id: string;
}

export function CreateDiscordModal(props: createDiscordModalProps) {
  const [discord, setDiscord] = useState("");
  useEffect(() => {
    api.get(`ads/${props.id}/discord`).then((response) => {
      setDiscord(response.data.discord);
    });
  }, []);

  return (
    <Dialog.Overlay className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </Dialog.Overlay>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <Dialog.Content
          className="inline-block p-6 align-bottom bg-[#2A2634] rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
          aria-labelledby="modal-headline"
        >
          <div className="flex justify-between flex-col sm:flex sm:items-center sm:justify-betweem ">
            <CheckCircle size={64} className="text-emerald-400 mx-auto my-8" />
            <div>
              <Dialog.Title
                className="text-3xl leading-6 font-bold text-zinc-100 text-center"
                id="modal-headline"
              >
                Let's Play!
              </Dialog.Title>

              <p className="text-sm text-gray-500 mt-4">
                Here's the discord of the player you're looking for:
              </p>
            </div>
            <div className="mt-8 w-full sm:w-5/6 text-center">
              <p className="mb-2">
                Add the player on discord and start playing!
              </p>
              <div className=" p-4 rounded bg-zinc-900">
                <p className="text-md text-zinc-200">{discord}</p>
              </div>
            </div>
          </div>
          {/* <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus
                :ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div> */}
        </Dialog.Content>
      </div>
    </Dialog.Overlay>
  );
}
