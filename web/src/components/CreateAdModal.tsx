import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import api from "../services/api";
import { Check, GameController } from "phosphor-react";
import { useEffect, useState } from "react";
import { Input } from "../components/Form/Input";

interface Game {
  id: number;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVOIP, setUseVOIP] = useState(false);
  useEffect(() => {
    api.get("games").then((response: any) => setGames(response.data));
  }, []);

  async function handleCreateAd(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      await api.post(`games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceMail: useVOIP,
      });
      alert("Ad created successfully!");
    } catch (err) {
      alert("Error creating ad!");
      console.error(err);
    }
  }
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content className="fixed bg-[#2a2534] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-4xl font-black">
          Publish an ad
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              What's the game?
            </label>
            <select
              name="game"
              id="game"
              placeholder="select a game you want to play"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
            >
              <option disabled selected>
                select a game you want to play
              </option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Your name (ou nickname)</label>
            <Input
              name="name"
              id="name"
              type="text"
              placeholder="How should we call you?"
            />
          </div>
          <div className=" grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Years playing</label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="It's ok to be 0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord"> What is your's discord?</label>
              <Input
                id="discord"
                type="text"
                placeholder="user#0000"
                name="discord"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">What days do you play?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Sunday"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Monday"
                >
                  M
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Tuesday"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Wednesday"
                >
                  W
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Thursday"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Friday"
                >
                  F
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900 "
                  }`}
                  title="Saturday"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="HourStart">When do you play?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="from"
                />
                <Input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="to"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm text-center">
            <Checkbox.Root
              checked={useVOIP}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              onCheckedChange={(checked) => {
                if (checked) {
                  setUseVOIP(true);
                } else {
                  setUseVOIP(false);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            I use VOIP
          </label>
          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
              type="button"
            >
              Cancel
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Find my Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
