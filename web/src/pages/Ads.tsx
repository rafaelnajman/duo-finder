import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdBanner } from "../components/AdBanner";

interface Ad {
  name: string;
  id: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string;
  hourStart: number;
  hourEnd: number;
}

export function Ads() {
  const { id } = useParams();
  const [ads, setAds] = useState<Ad[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3333/games/${id}/ads`)
      .then((response) => {
        setAds(response.data);
      })
      .then(() => {
        console.log(ads);
      });
  }, []);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-16 mx-auto w-[90%] gap-6 ">
      {ads.map((ad) => {
        return (
          <AdBanner
            name={ad.name}
            yearsPlaying={ad.yearsPlaying}
            discord={ad.discord}
            weekDays={ad.weekDays}
            hourStart={ad.hourStart}
            hourEnd={ad.hourEnd}
          />
        );
      })}
    </div>
  );
}
