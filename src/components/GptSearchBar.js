import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { addSuggestedMovies } from "../utils/gptSlice";
import { API_OPTIONS } from "../utils/constants";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // search movie in TMDB database
  const searchMovieTMDB = async (movieName) => {
    const movieData = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await movieData.json();
    const results = json.results;
    return results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Mard, MS Dhoni";

    // Make an API call to GPT API and get Movie results
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });

    const gptResults = {
      choices: [
        {
          message: {
            content:
              searchText.current.value,
          },
        },
      ],
    };

    if (!gptResults.choices) {
      // TODO: Write Error handling
      console.log("Error has occured");
    }

    const gptMovies = gptResults.choices[0]?.message?.content.split(",");

    // for each movie i will search TMDB API
    const promiseArray = gptMovies.map((movieName) =>
      searchMovieTMDB(movieName)
    );
    // we get array of promise in data [Promise, Promise, Promise, Promise]
    const tmdbMovies = await Promise.all(promiseArray);
    dispatch(addSuggestedMovies({ tmdbMovies, movieNames: gptMovies }));
  };

  return (
    <div className="pt-[5%] flex justify-center ">
      <form
        className=" bg-gray-500 w-1/2 grid grid-cols-12 rounded-lg "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 rounded-lg col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="py-2 m-4 px-4 bg-red-700 rounded-lg text-white col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
