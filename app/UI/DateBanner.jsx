import React from "react";
import dayjs from "dayjs";

const DateBanner = () => {
  const ourDate = dayjs(); // Gets the current date and time

  // Format the date using Day.js
  const readableDate = ourDate.format("dddd, MMM. D, YYYY");

  return (
    <div className="w-full py-2 border-t-2 border-b-2 border-slate-300 opacity-90 bg-slate-200">
      <p className="font-bold text-center">{readableDate}</p>
    </div>
  );
};

export default DateBanner;
