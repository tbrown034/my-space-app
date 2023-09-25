"use client";
import React, { useEffect, useState } from "react";
import Tag from "../UI/Tag";
const PickOfDay = () => {
  const [photoData, setPhotoData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const [showFullText, setShowFullText] = useState(false); // New state to toggle full text

  useEffect(() => {
    async function getPhoto() {
      try {
        setIsLoading(true); // Set to true before starting the fetch operation
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
      } finally {
        setIsLoading(false); // Set to false after either success or error
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
    <div className="flex flex-col gap-2">
      <Tag text="NASA APOD" />
      {isLoading ? (
        <p>Loading...</p>
      ) : photoData ? (
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-center hover:text-slate-500">
            {photoData.title}
          </h1>
          {photoData.media_type === "image" ? (
            <img
              className="rounded-xl"
              src={photoData.url}
              alt={photoData.title}
            />
          ) : (
            <iframe
              width={800}
              height={300}
              layout="responsive"
              className="w-full rounded-xl"
              src={photoData.url}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}

          {photoData.copyright && (
            <p className="mt-1 text-xs italic">
              Photo Credit: {photoData.copyright}
            </p>
          )}

          <div className="p-2 text-base">
            <span className="font-medium">NASA Picture of the Day: </span>
            <span>
              {showFullText
                ? photoData.explanation
                : truncateText(photoData.explanation)}
            </span>
            <a
              href="#!"
              onClick={() => setShowFullText(!showFullText)}
              className="ml-2 font-semibold text-blue-600 hover:text-blue-800"
            >
              {showFullText ? "Show less" : "Click for more"}
            </a>
          </div>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : null}
    </div>
  );
};

export default PickOfDay;
