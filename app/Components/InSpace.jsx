"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const InSpace = () => {
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://api.open-notify.org/astros.json");
        const data = await res.json();
        setPeopleInSpace(data.people);
        setShowAnimation(true);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-lg p-8 mx-auto text-white bg-blue-800 rounded-3xl"
    >
      <p className="text-2xl">Number of People in Space:</p>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: showAnimation ? 1 : 0,
          scale: showAnimation ? 1 : 0.5,
        }}
        transition={{ duration: 0.5 }}
        className="m-2 text-4xl text-yellow-300"
      >
        {peopleInSpace.length}
      </motion.span>
      <ul className="list-decimal list-inside">
        {peopleInSpace.map((person, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: showAnimation ? 1 : 0,
              y: showAnimation ? 0 : -20,
            }}
            transition={{ delay: index * 0.3 }}
            className="my-2 text-xl"
          >
            👨‍🚀 {person.name} is currently on the 🚀 {person.craft}.
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default InSpace;
