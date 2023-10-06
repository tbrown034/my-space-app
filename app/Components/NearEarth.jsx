// "use client"
import { useState, useEffect } from "react";
import Tag from "../UI/Tag";

export default function NearEarth({ setActiveComponent }) {
  const [asteroids, setAsteroids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getNearEarth() {
      const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
      const today = new Date().toISOString().split("T")[0];
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`
      );
      const data = await res.json();
      setAsteroids(data.near_earth_objects[today]);
      setIsLoading(false);
    }
    getNearEarth();
  }, []);

  if (isLoading) {
    return <Tag text="Fetching the latest asteroid data for you..." />;
  }

  return (
    <>
      <Tag text="Near-Earth Objects" />
      <p className="text-center">
        Earth and how it relates to near-earth objects.
      </p>
      <div className="flex flex-wrap justify-center rounded-2xl bg-slate-700">
        <div className="relative m-4 rounded-lg w-96 h-96 ">
          <div
            className="absolute flex items-center justify-center w-4 h-4 rounded-full bg-blue-50"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            title="This is Earth"
          ></div>
          {asteroids.map((asteroid, index) => {
            const distance = parseFloat(
              asteroid.close_approach_data[0].miss_distance.kilometers
            );
            const scaledDistance = Math.min(48, distance / 1000000); // 48% so it won't touch the edges
            const randomAngle = Math.random() * 2 * Math.PI;
            const x = 50 + scaledDistance * Math.cos(randomAngle);
            const y = 50 + scaledDistance * Math.sin(randomAngle);
            return (
              <>
                <div
                  key={index}
                  className="absolute flex items-center justify-center w-2 h-2 rounded-full bg-slate-900 opacity-90 "
                  style={{
                    top: `calc(${y}% - 2px)`,
                    left: `calc(${x}% - 2px)`,
                  }}
                  title={`Name: ${asteroid.name}\nDistance from Earth: ${distance} km`}
                >
                  <div className="p-2 text-xs font-semibold text-white opacity-0 hover:opacity-100 hover:bg-gray-800 hover:rounded-lg hover:shadow">
                    <strong>{asteroid.name}</strong>
                    <br />
                    Distance: {distance} km
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <button
        className="w-32 p-4 border-2 border-blue-600 rounded-2xl hover:bg-blue-500 active:bg-blue-800 hover:text-slate-200"
        onClick={() => setActiveComponent(null)} // setting activeComponent to null to close ScienceBot
      >
        Close
      </button>
    </>
  );
}
