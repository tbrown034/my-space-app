import React from "react";
import dayjs from "dayjs";

const DateBanner = () => {
  const ourDate = dayjs(); // Gets the current date and time

  // Format the date using Day.js
  const readableDate = ourDate.format("dddd, MMM. D, YYYY");

  return (
    <div>
      <p className="font-bold text-center">{readableDate}</p>
    </div>
  );
};

export default DateBanner;
