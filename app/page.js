"use client";
import DateBanner from "./UI/DateBanner";
import News from "./Components/News";
import PickOfDay from "./Components/PickOfDay";
import InSpace from "./Components/InSpace";
import TopArticles from "./Components/TopArticles";
export default function Home() {
  return (
    <main className="p-2">
      <div className="flex flex-col gap-4 p-4 ">
        <News />
        <TopArticles />
        <PickOfDay />
        <InSpace />
      </div>
    </main>
  );
}
