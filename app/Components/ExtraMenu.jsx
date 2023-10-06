import Tag from "../UI/Tag";
import InSpace from "./InSpace";
import NearEarth from "./NearEarth";
import PlanetSelect from "./PlanetSelect";
import ScienceBot from "./ScienceBot";
import { useState } from "react";
const ExtraMenu = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <>
      <Tag text="Explore More" />
      <h1 className="text-3xl font-bold text-center hover:text-slate-500">
        Keep Exploring
      </h1>
      <p>
        Have you ever pondered about the number of astronauts currently orbiting
        the Earth, or the whereabouts and details of the nearest
        Earth-approaching asteroids? Or wanted to ask a "digital" Carl Sagan or
        Neil deGrasse Tyson about the wonders of the cosmo? Fuel your
        inquisitiveness below!
      </p>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <button
          onClick={() => setActiveComponent("ScienceBot")}
          className="p-4 bg-white border-2 border-blue-600 rounded-2xl hover:bg-blue-500 active:bg-blue-800 hover:text-slate-200"
        >
          Ask a (🤖) Scientist
        </button>
        <button
          onClick={() => setActiveComponent("NearEarthAsteroids")}
          className="p-4 bg-white border-2 border-blue-600 rounded-2xl hover:bg-blue-500 active:bg-blue-800 hover:text-slate-200"
        >
          Near-Earth Astroids ☄️
        </button>
        <button
          onClick={() => setActiveComponent("PeopleInSpace")}
          className="p-4 bg-white border-2 border-blue-600 rounded-2xl hover:bg-blue-500 active:bg-blue-800 hover:text-slate-200"
        >
          How Many People 🧑🏼‍🚀 Are in Space?
        </button>
        <button
          onClick={() => setActiveComponent("Planets")}
          className="p-4 bg-white border-2 border-blue-600 rounded-2xl hover:bg-blue-500 active:bg-blue-800 hover:text-slate-200"
        >
          Our Universe 🌌
        </button>
      </div>
      {activeComponent === "ScienceBot" && (
        <ScienceBot setActiveComponent={setActiveComponent} />
      )}
      {activeComponent === "NearEarthAsteroids" && (
        <NearEarth setActiveComponent={setActiveComponent} />
      )}
      {activeComponent === "PeopleInSpace" && (
        <InSpace setActiveComponent={setActiveComponent} />
      )}
      {activeComponent === "Planets" && (
        <PlanetSelect setActiveComponent={setActiveComponent} />
      )}
    </>
  );
};
export default ExtraMenu;
