// "use client";  // Comment this out if it's not applicable in your setup
"use client";

import React, { useState, useEffect } from "react";

const InSpace = () => {
  const [peopleInSpace, setPeopleInSpace] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://api.open-notify.org/astros.json");
        const data = await res.json();
        setPeopleInSpace(data.people); // Update the state
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData(); // Invoke the function
  }, []);

  return (
    <div>
      <p>Number of People in Space:</p>
      <span className="">{peopleInSpace.length}</span>
      <ul>
        {peopleInSpace.map((person, index) => (
          <li key={index}>
            {person.name} is currently on the {person.craft}.{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InSpace;
