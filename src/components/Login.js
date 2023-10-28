import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    // Validate the form data
    const validationResult = checkValidData(
      email.current.value,
      password.current.value
    );

    setErrorMessage(validationResult);

    if (validationResult) return;

    if (!isSignInForm) {
      // signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          // Update user name
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/26822095?s=400&u=cc86d4b3522c117043e725b78880b4152eca1a1a&v=4",
          })
            .then(() => {
              // fetch from the updated user and dispatch action of addUser with the updated info
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));

              // navigate to browse page after successfully signed in
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          setErrorMessage(errorCode);
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          // Signed in
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          setErrorMessage(errorCode);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black w-3/12 p-12 mt-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign in" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-3 my-4 w-full rounded-lg bg-gray-700"
          />
        )}

        <input
          type="text"
          ref={email}
          placeholder="Email or phone number"
          className="p-3 my-4 w-full rounded-lg bg-gray-700"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-3 my-4 w-full rounded-lg bg-gray-700"
        />
        <button
          className="my-6 p-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign in" : "Sign Up"}
        </button>
        <p className=" px-2 font-bold text-lg py-2 text-red-500">
          {errorMessage}
        </p>
        <p className="py-4 cursor-pointer " onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix Sign Up Now"
            : "Already registred ? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
