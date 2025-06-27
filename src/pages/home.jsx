import { useEffect, useState } from "react";
import {
  // user functions
  createLocalStorageForUser,
  readLocalStorageForUser,
  updateLocalStorageForUser,
  deleteLocalStorageForUser,

  // profile functions
  createLocalProfileStorage,
  readLocalProfileStorage,
  updateLocalProfileStorage,
  deleteLocalProfileStorage,
} from "../functions/localStorage";

import { readUserProfile } from "../functions/apiCommunication";

import LogInSignUp from "./logInSignUp";
import ProfileCreationPage from "./profileCreation";

export default function LandingPage({
  userInfo,
  setUserInfo,
  profileObject,
  setProfileObject,
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  // actions to be performed when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setLoggedIn(true);
    } else if (!userInfo && loggedIn) {
      // remove user and profile from local storage then set loggedIn to false
      deleteLocalProfileStorage();
      deleteLocalStorageForUser();
      setProfileObject(null);
      setUserInfo(null);
      setLoggedIn(false);
    }
  }, [userInfo]);

  if (!userInfo) {
    return (
      <LogInSignUp
        setUserInfo={setUserInfo}
        setProfileObject={setProfileObject}
      />
    );
  } else if (!profileObject) {
    return (
      <ProfileCreationPage
        userInfo={userInfo}
        setProfileObject={setProfileObject}
      />
    );
  }

  return (
    <>
      <h1>To do</h1>
    </>
  );
}
