import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tag from "../UI/Tag";

const InSpace = () => {
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
      <div className="p-2 rounded-2xl">
        <span>
          It's almost impossible to calculate the exact number of people in - or
          mabybe on - the world. But we can at least keep track of our humans in
          space!
        </span>{" "}
        <span>
          Data courtesy of{" "}
          <a
            href="http://api.open-notify.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 hover:underline"
          >
            Open Notify API
          </a>
          .
        </span>
      </div>
      {error ? (
        <p>Error: {error}</p>
      ) : isLoading ? ( // Added Loading condition
        <p>Loading...</p>
      ) : (
        <div className="p-2 px-4 space-y-2 text-white bg-slate-900 rounded-3xl">
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
      )}
    </>
  );
};

export default InSpace;
