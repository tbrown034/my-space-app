"use client";
import News from "./Components/News";
import PickOfDay from "./Components/PickOfDay";
import InSpace from "./Components/InSpace";
import TopArticles from "./Components/TopArticles";
import PlanetSelect from "./Components/PlanetSelect";
import NearEarth from "./Components/NearEarth";
import ScienceBot from "./Components/ScienceBot.jsx";
export default function Home() {
  return (
    <main className="p-2">
      <div className="flex flex-col gap-4 p-4 ">
        <News />
        <ScienceBot />

        <PickOfDay />
        <PlanetSelect />
        <NearEarth />

        <InSpace />
        <TopArticles />
      </div>
    </main>
  );
}
