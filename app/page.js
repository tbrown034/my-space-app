"use client";
import DateBanner from "./UI/DateBanner";
import News from "./UI/News";
import PickOfDay from "./UI/PickOfDay";
export default function Home() {
  return (
    <main className="gap-4 p-4">
      <DateBanner />
      <News />
      <PickOfDay />
    </main>
  );
}
