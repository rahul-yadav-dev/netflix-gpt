import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;

  return (
    <div className="pb-5">
      <h1 className="font-bold text-xl text-white">{title}</h1>
      <div className="flex overflow-x-auto">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} path={movie.poster_path} />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default MovieList;
