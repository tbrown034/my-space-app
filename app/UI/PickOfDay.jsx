"use client";

import React, { useEffect, useState } from "react";

const PickOfDay = () => {
  const [photoData, setPhotoData] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        NASA's Picture of the Day
      </h1>
      {photoData ? (
        <div className="flex flex-col">
          <img src={photoData.url} alt={photoData.title} />
          <h1 className="text-center text-2x ">{photoData.title}</h1>

          <p className="text-sm">{photoData.explanation}</p>
          <p className="text-sxm">Photo Credit: {photoData.copyright}</p>
          <p className="text-sxm">Photo Credit: {photoData.resource}</p>
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
