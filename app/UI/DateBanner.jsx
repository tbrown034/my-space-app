import React from "react";

const DateBanner = () => {
  const ourDate = new Date();
  return (
    <div>
      {/* Convert the Date object to a string */}
      <p>{ourDate.toString()}</p>
    </div>
  );
};

export default DateBanner;
