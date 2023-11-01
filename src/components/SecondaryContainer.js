import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import camelCaseToWords from "../utils/camelCaseToWord";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies.category);
  const movieKeys = Object.keys(movies);
  return (
    <div className="">
      <div className=" -mt-48 ml-10 relative z-20">
        {movieKeys.map((movieCategory) => (
          <MovieList
            title={camelCaseToWords(movieCategory)}
            movies={movies[movieCategory]}
            key={movieCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default SecondaryContainer;
