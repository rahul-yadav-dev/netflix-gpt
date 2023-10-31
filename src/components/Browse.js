import React from "react";
import Header from "./Header";
import { useNowPlayingMovies } from "../custom-hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div className="bg-black">
      <Header />
      <GptSearch />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
