import React from "react";

export const TitleLine = ({ title }) => {
  return (
    <div className="flex flex-col justify-center items-center my-6">
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
      <div className="w-1/6 md:w-1/12 h-1.5 mt-1 bg-[#1D6F64]"></div>
    </div>
  );
};
