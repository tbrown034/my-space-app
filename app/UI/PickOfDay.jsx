"use client";
import React, { useEffect, useState } from "react";

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
      <h1 className="text-2xl font-bold">NASA's Picture of the Day</h1>

      {photoData ? (
        <div className="flex flex-col">
          <h1 className="text-2xl ">{photoData.title}</h1>

          <img src={photoData.url} alt={photoData.title} />
          <caption className="text-sm">
            Photo Credit: {photoData.copyright}
          </caption>

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
