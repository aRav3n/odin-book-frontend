import { useEffect, useState } from "react";
import {
  createLocalStorageForUser,
  readLocalStorageForUser,
  updateLocalStorageForUser,
} from "../functions/localStorage";

import LogInSignUp from "./logInSignUp";
import ProfileCreationPage from "./profileCreation";

export default function LandingPage({
  userInfo,
  setUserInfo,
  profileObject,
  setProfileObject,
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  // setLoggedIn based on userInfo
  useEffect(() => {
    if (userInfo && !loggedIn) {
      createLocalStorageForUser(userInfo);
      setLoggedIn(true);
    } else if (!userInfo && !loggedIn) {
      const userObject = readLocalStorageForUser();
      if (userObject) {
        setLoggedIn(true);
        setUserInfo(userObject);
      }
    } else if (userInfo.profile && loggedIn) {
      console.log("updating user info!", userInfo);
      updateLocalStorageForUser(userInfo);
    }
  }, [userInfo]);

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
      <ProfileCreationPage userInfo={userInfo} setProfileObject={setProfileObject} />
    );
  }

  return (
    <>
      <h1>To do</h1>
    </>
  );
}
