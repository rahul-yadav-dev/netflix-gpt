import React from "react";
import { IMAGE_CDN_URL } from "../utils/constants";

const MovieCard = ({ path }) => {
  return (
    <div className="m-2 w-48">
      <img src={IMAGE_CDN_URL + path} alt="poster" className="rounded-md" />
    </div>
  );
};

export default MovieCard;
