import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[20%] ml-10 absolute text-white w-screen aspect-video bg-gradient-to-r to-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-2/4 ">{overview}</p>
      <div className="mb-4">
        <button className="mr-4 bg-white text-black text-xl px-10 py-3 rounded-lg  font-bold hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="mr-4 bg-gray-500 px-10 text-xl text-white py-3 rounded-lg hover:bg-opacity-80">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
