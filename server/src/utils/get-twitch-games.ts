import axios from "axios";

interface gameResponse {
  id: string;
  name: string;
  box_art_url: string;
}
interface IAcessTokenResponse {
  access_token: string;
}

export async function getTwitchGames(): Promise<gameResponse[]> {
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
  return games.data.data;
}
