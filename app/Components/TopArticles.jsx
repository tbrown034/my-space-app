"use client";
import React from "react";
import { useState, useEffect } from "react";
import Tag from "../UI/Tag";

const TopArticles = () => {
  const [mostViewed, setMostViewed] = useState(null); // Set the initial state to null for clarity
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMostViewed() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NYT_API_KEY;
        const result = await fetch(
          `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${apiKey}`
        );
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data = await result.json();
        setMostViewed(data);
      } catch (e) {
        setError(e.toString());
      }
    }
    getMostViewed();
  }, []);

  return (
    <div>
      <Tag text="Top US and World News" />
      {mostViewed ? (
        <div>
          <ul className="space-y-1 list-disc list-inside">
            {mostViewed.results.slice(0, 10).map((article, index) => (
              <li
                className="px-4 hover:underline hover:text-blue-800"
                key={index}
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default TopArticles;
