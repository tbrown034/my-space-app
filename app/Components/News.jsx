"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Tag from "../UI/Tag";

const News = () => {
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getNews() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NYT_API_KEY;
        const res = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${apiKey}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!data.results || data.results.length < 8) {
          throw new Error("Not enough articles");
        }

        setNewsData(data);
      } catch (e) {
        setError(e.toString());
      }
    }

    getNews();
  }, []);

  return (
    <>
      {error ? (
        <p className="text-red-500 bg-yellow-200 ">Error: {error}</p>
      ) : newsData ? (
        <div className="flex flex-col gap-2">
          <a
            href={newsData.results[2].url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1 className="text-3xl font-bold text-center hover:text-slate-500">
              {newsData.results[2].title}
            </h1>
          </a>

          {newsData.results[0].multimedia &&
          newsData.results[0].multimedia.length > 0 ? (
            <a
              href={newsData.results[2].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={newsData.results[2].multimedia[0].url}
                alt={newsData.results[0].title}
                width={800}
                height={300}
                layout="responsive"
                className="w-full rounded-xl"
              />
            </a>
          ) : null}

          <a
            href={newsData.results[2].url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-2xl font-semibold opacity-95 hover:text-gray-500">
              {newsData.results[2].abstract}
            </h2>
          </a>

          <div className="pt-4 border-t-2 border-b-2 border-slate-300">
            <a
              href={newsData.results[3].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="p-2 py-8 text-xl font-bold">
                {newsData.results[3].title}
              </h2>
            </a>
          </div>
          <div className="border-b-2 border-slate-300">
            <a
              href={newsData.results[4].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="p-2 py-8 text-xl font-bold">
                {newsData.results[4].title}
              </h2>
            </a>
          </div>
          <div>
            <Tag text="More Top News" />
            <ul className="p-2 px-6 space-y-1 list-disc ">
              {newsData.results.slice(5, 11).map((article, index) => (
                <li
                  className="px-4 hover:underline hover:text-blue-800"
                  key={index}
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Loading...</p>
      )}
    </>
  );
};

export default News;
