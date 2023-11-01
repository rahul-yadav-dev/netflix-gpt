import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const GptMovieSuggestion = () => {
  const { movieResultNames, suggestedMovies } = useSelector(
    (store) => store.gpt
  );

  if (!movieResultNames) return null;
  console.log(suggestedMovies)

  return (
    <div className="bg-black text-white bg-opacity-90 ml-7 mr-7 mt-5 p-4">
      {movieResultNames.map((movieName, index) => (
        <MovieList title={movieName} movies={suggestedMovies[index]} />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
