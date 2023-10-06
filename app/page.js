"use client";
import News from "./Components/News";
import PickOfDay from "./Components/PickOfDay";
import TopArticles from "./Components/TopArticles";
import Footer from "./UI/Footer.jsx";

import ExtraMenu from "./Components/ExtraMenu";
export default function Home() {
  return (
    <main className="p-2">
      <div className="flex flex-col gap-4 p-4 ">
        <News />
        <TopArticles />

        <PickOfDay />
        <ExtraMenu />
        <Footer />
      </div>
    </main>
  );
}
