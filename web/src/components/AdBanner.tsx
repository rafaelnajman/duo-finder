interface AdBannerProps {
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string;
  hourStart: number;
  hourEnd: number;
}

export function AdBanner(props: AdBannerProps) {
  return (
    <div className="h-[300px] w-[100%] bg-slate-700 rounded">
      <p>{props.name}</p>
    </div>
  );
}
