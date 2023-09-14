"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

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
        <p>Error: {error}</p>
      ) : newsData ? (
        <>
          {/* Elevated top story */}
          <div className="top-story">
            <h1 className="text-2xl font-bold">{newsData.results[2].title}</h1>

            {newsData.results[0].multimedia &&
            newsData.results[0].multimedia.length > 0 ? (
              <Image
                src={newsData.results[2].multimedia[0].url}
                alt={newsData.results[0].title}
                width={500}
                height={300}
              />
            ) : null}
          </div>

          {/* Remaining stories */}
          <ul className="list-disc list-inside">
            {newsData.results.slice(3, 9).map((article, index) => (
              <li className="hover:underline" key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default News;
