import React from "react";
import loadinggif from "../assets/preloader.gif";

const Loading = () => {
  return (
    <>
      <div className="w-full min-h-[200px] flex justify-center items-center px-4 py-6">
        <img src={loadinggif} alt="Loading..." className="max-w-full h-auto" />
      </div>
    </>
  );
};

export default Loading;
