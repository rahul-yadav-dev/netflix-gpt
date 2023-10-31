import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = async (movieId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getMovieVideos();
  }, []);

  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const videoData = await data.json();

    const filterData = videoData.results.filter(
      (video) => video.type === "Trailer"
    );

    const trailer = filterData.length ? filterData[0] : videoData.results[0];
    dispatch(addTrailerVideo(trailer));
  };
};

export default useMovieTrailer;
