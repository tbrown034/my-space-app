"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Import the Next.js Image component

const PickOfDay = () => {
  const [photoData, setPhotoData] = useState(null);
  const [error, setError] = useState(null);
  const [showFullText, setShowFullText] = useState(false); // New state to toggle full text

  useEffect(() => {
    async function getPhoto() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setPhotoData(data);
      } catch (e) {
        setError(e.toString());
      }
    }

    getPhoto();
  }, []);

  // Function to truncate text to the first 100 words
  const truncateText = (text, wordLimit = 100) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div>
      <div className="inline-block p-0.5 px-2 text-sm font-bold text-semibold bg-slate-300 rounded-3xl text-semibold mb-1">
        <p className="text-xs ">NASA Pic of the Day </p>
      </div>
      {photoData ? (
        <div className="flex flex-col gap-2">
          <h1 className="mb-2 text-3xl font-bold text-cente hover:text-slate-500 ">
            {photoData.title}
          </h1>

          <img
            className="rounded-xl"
            src={photoData.url}
            alt={photoData.title}
          />
          <p className="text-sm italic">Photo Credit: {photoData.copyright}</p>

          <p className="text-sm">
            {showFullText
              ? photoData.explanation
              : truncateText(photoData.explanation)}
            <a
              href="#!"
              onClick={() => setShowFullText(!showFullText)}
              className="ml-2 text-blue-600"
            >
              {showFullText ? "Show less" : "Click for more"}
            </a>
          </p>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Unknown Error: Data not available</p>
      )}
    </div>
  );
};

export default PickOfDay;
