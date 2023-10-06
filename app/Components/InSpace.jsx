import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tag from "../UI/Tag";

const InSpace = ({ setActiveComponent }) => {
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [error, setError] = useState(null); // Error state
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading to true at the start of fetch
        const res = await fetch("http://api.open-notify.org/astros.json");
        const data = await res.json();
        setPeopleInSpace(data.people);
        setShowAnimation(true);
      } catch (error) {
        setError("Error fetching data."); // Set the error state if an error occurs
        console.log("error", error);
      } finally {
        setIsLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Tag text="People in Space" />
      <p className="text-center">Humans in Space</p>
      {error ? (
        <p>Error: {error}</p>
      ) : isLoading ? ( // Added Loading condition
        <p>Loading...</p>
      ) : (
        <>
          <div className="p-2 px-4 space-y-2 text-white rounded-3xl bg-slate-700">
            <div className="flex items-center justify-center">
              <span className="text-2xl">Number of People in Space:</span>
              <span className="p-2 text-4xl text-yellow-300 ">
                {peopleInSpace.length}
              </span>
            </div>
            <div className="flex flex-col gap-2 px-2">
              {peopleInSpace.map((person, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: showAnimation ? 1 : 0,
                    y: showAnimation ? 0 : -20,
                  }}
                  transition={{ delay: index * 0.5, duration: 1 }}
                >
                  👨‍🚀 {person.name} is currently on the 🚀 {person.craft}.
                </motion.div>
              ))}
            </div>
          </div>
          <button
            className="w-32 p-4 border-2 border-blue-600 rounded-2xl hover:bg-blue-500 active:bg-blue-800 hover:text-slate-200"
            onClick={() => setActiveComponent(null)} // setting activeComponent to null to close ScienceBot
          >
            Close
          </button>
        </>
      )}
    </>
  );
};

export default InSpace;
