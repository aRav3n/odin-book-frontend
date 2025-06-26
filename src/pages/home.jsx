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
    if (userInfo && !loggedIn) {
      // first search for an existing user profile and set it to state if it exists
      const localProfileObject = readLocalProfileStorage();
      (async () => {
        const profile = await readUserProfile(userInfo.token);
        if (profile) {
          createLocalProfileStorage(profile);
          setProfileObject(profile);
        }
      })();

      // then set user in state and change loggedIn to true
      createLocalStorageForUser(userInfo);
      setLoggedIn(true);
    } else if (!userInfo && !loggedIn) {
      // search local storage for an existing user object and set it to state if it exists
      const userObject = readLocalStorageForUser();
      if (userObject) {
        setUserInfo(userObject);
      }
    } else if (!userInfo && loggedIn) {
      // remove user and profile from local storage then set loggedIn to false
      deleteLocalProfileStorage();
      deleteLocalStorageForUser();
      setLoggedIn(false);
    }
  }, [userInfo]);

  // actions to be performed when profileObject changes
  useEffect(() => {}, [profileObject]);

  if (!loggedIn) {
    return (
      <LogInSignUp
        setUserInfo={setUserInfo}
        setProfileObject={setProfileObject}
      />
    );
  }
  if (!profileObject) {
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
