// "use client"
import { useState, useEffect } from "react";
import Tag from "../UI/Tag";

export default function NearEarth() {
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
      <Tag
        text="🌌 Near-Earth Asteroids: Are We Safe? 🌍"
        className="mb-4 text-2xl"
      />
      <div className="mb-6 text-center">
        <p>Discover the closest asteroids approaching Earth today!</p>
      </div>
      <div className="flex justify-center">
        <div className="relative w-64 h-64 rounded-lg bg-sky-400">
          <div
            className="absolute flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            title="This is Earth"
          >
            <span className="p-2 text-xs font-semibold text-white">Earth</span>
          </div>
          {asteroids.map((asteroid, index) => {
            const distance = parseFloat(
              asteroid.close_approach_data[0].miss_distance.kilometers
            );
            const scaledDistance = Math.min(100, distance / 1000000); // Scale down
            const randomAngle = Math.random() * 2 * Math.PI;
            const x = 50 + scaledDistance * Math.cos(randomAngle);
            const y = 50 + scaledDistance * Math.sin(randomAngle);
            return (
              <div
                key={index}
                className="absolute flex items-center justify-center w-4 h-4 bg-red-500 rounded-full opacity-80 hover:bg-red-600"
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
            );
          })}
        </div>
      </div>
    </>
  );
}
