"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tag from "../UI/Tag";

const InSpace = () => {
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://api.open-notify.org/astros.json");
        const data = await res.json();
        setPeopleInSpace(data.people);
        setShowAnimation(true);
      } catch (error) {
        setError("Error fetching data."); // Set the error state if an error occurs
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error ? ( // Render this block if there is an error
        <p>Error: {error}</p>
      ) : (
        <div className="p-2 px-4 space-y-2 text-white bg-blue-800 rounded-3xl">
          <div className="flex items-center justify-center">
            <p className="text-2xl">Number of People in Space:</p>
            <span className="m-2 text-4xl text-yellow-300">
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
                transition={{ delay: index * 0.5, duration: 1 }} // Slowed down to 1 second
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
