"use client";
import DateBanner from "./UI/DateBanner";
import News from "./Components/News";
import PickOfDay from "./Components/PickOfDay";
import InSpace from "./Components/InSpace";
export default function Home() {
  return (
    <main className="gap-4 py-4">
      <DateBanner />
      <News />
      <PickOfDay />
      <InSpace />
    </main>
  );
}
