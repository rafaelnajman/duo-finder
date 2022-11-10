import { Link } from "react-router-dom";

interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
  id: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <Link
      to={`/${props.id}/ads`}
      className="relative rounded-lg overflow-hidden"
    >
      <img src={props.bannerUrl} alt="Game" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 right-0 bottom-0">
        <strong className="font-bold text-white block">{props.title}</strong>
        <span className="text-zinc-300 text-sm block">
          {" "}
          {props.adsCount} ad(s)
        </span>
      </div>
    </Link>
  );
}
