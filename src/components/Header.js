import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

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

  return (
    <div className="absolute h-24 px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />

      {user && (
        <div className="flex">
          <img
            className="w-18 rounded-lg mr-4 my-2"
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
