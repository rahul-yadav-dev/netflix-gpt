import React from "react";
import Header from "./Header";
import { useNowPlayingMovies } from "../custom-hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {
        /*
        Main Container
         - video background
         - video title
        Secondary Container 
          - Movie list X N
              - Movie cards X M

        */
      }
    </div>
  );
};

export default Browse;
