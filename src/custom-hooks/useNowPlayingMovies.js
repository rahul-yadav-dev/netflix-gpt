import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
} from "../utils/movieSlice";
import { useEffect } from "react";

export const useNowPlayingMovies = () => {
  // Fetch movies from TMDB api and push to redux
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getMovies = async () => {
    await fetchDataAndDispatch(addNowPlayingMovies, "now_playing");
    await fetchDataAndDispatch(addPopularMovies, "popular");
    await fetchDataAndDispatch(addTopRatedMovies, "top_rated");
    await fetchDataAndDispatch(addUpcomingMovies, "upcoming");
  };

  async function fetchDataAndDispatch(dispatchAction, type) {
    const url =
      "https://api.themoviedb.org/3/movie/" + type + "?language=en-US&page=1";
    const response = await fetch(url, API_OPTIONS);
    const data = await response.json();
    dispatch(dispatchAction(data.results));
  }

  useEffect(() => {
    !nowPlayingMovies && getMovies();
  }, []);
};
