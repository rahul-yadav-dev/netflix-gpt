import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../custom-hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  if (!trailerVideo) return;

  return (
    <div className="w-screen">
      <iframe
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        className="w-screen aspect-video"
        // controls="0"
        // loop="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
