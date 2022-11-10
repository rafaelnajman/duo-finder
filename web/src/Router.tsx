import { Route, Routes } from "react-router-dom";
import { Ads } from "./pages/Ads";
import { Home } from "./pages/Home";
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id/ads" element={<Ads />} />
    </Routes>
  );
}
