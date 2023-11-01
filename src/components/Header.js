import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const language = useSelector((store) => store.config.lang);

  useEffect(() => {
    // this is a event listener so doing it in useEffect, since we only want to do it once
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      // Unsubscribe when component is unmount
      unsubscribe();
    };
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleOnSelect = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute h-20 px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />

      {user && (
        <div className="flex">
          {showGptSearch && (
            <select
              className="bg-gray-900 text-white rounded-lg mr-3 p-4"
              onChange={handleOnSelect}
              defaultValue={language}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="px-4 mr-5 border border-purple-800 bg-purple-500 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "Gpt Search "}
          </button>

          <img
            className="w-18 rounded-lg mr-4"
            alt="usericon"
            src={user?.photoURL}
          />

          <button
            className="font-bold text-white cursor-pointer"
            onClick={handleSignout}
          >
            (Sign out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
