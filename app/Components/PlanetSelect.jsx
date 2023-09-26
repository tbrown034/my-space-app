"use client";
import { useState } from "react";
import Tag from "../UI/Tag";

const planets = [
  {
    name: "Mercury",
    color: "bg-gray-400 text-white",
    size: "w-8 h-8",
    url: "https://solarsystem.nasa.gov/planets/mercury/overview/",
  },
  {
    name: "Venus",
    color: "bg-yellow-300 text-white",
    size: "w-18 h-18",
    url: "https://solarsystem.nasa.gov/planets/venus/overview/",
  },
  {
    name: "Earth",
    color: "bg-blue-500 text-white",
    size: "w-20 h-20",
    url: "https://solarsystem.nasa.gov/planets/earth/overview/",
  },
  {
    name: "Mars",
    color: "bg-red-500 text-white",
    size: "w-12 h-12",
    url: "https://solarsystem.nasa.gov/planets/mars/overview/",
  },
  {
    name: "Jupiter",
    color: "bg-yellow-600 text-white",
    size: "w-70 h-70",
    url: "https://solarsystem.nasa.gov/planets/jupiter/overview/",
  },
  {
    name: "Saturn",
    color: "bg-yellow-400 text-white",
    size: "w-60 h-60",
    url: "https://solarsystem.nasa.gov/planets/saturn/overview/",
  },
  {
    name: "Uranus",
    color: "bg-blue-300 text-white",
    size: "w-32 h-32",
    url: "https://solarsystem.nasa.gov/planets/uranus/overview/",
  },
  {
    name: "Neptune",
    color: "bg-blue-700 text-white",
    size: "w-30 h-30",
    url: "https://solarsystem.nasa.gov/planets/neptune/overview/",
  },
];

export default function PlanetSelect() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <>
      <Tag text="The Planets" />
      <div className="text-center">
        <p>The earth and its fellow planets.</p>
      </div>
      <div className="flex flex-wrap justify-center rounded-2xl bg-slate-700">
        {planets.map((planet, index) => (
          <a
            href={planet.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <div
              className={`relative m-4 p-8 rounded-full flex items-center justify-center cursor-pointer ${planet.color} hover:ring-4 hover:ring-opacity-50 hover:ring-white hover:scale-110 transition-transform ${planet.size}`}
              onClick={() => setSelectedPlanet(planet.name)}
            >
              <span className="absolute inset-0 flex items-center justify-center p-2 text-xs font-semibold opacity-0 hover:opacity-100">
                {planet.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
