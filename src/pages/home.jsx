import { useEffect, useState } from "react";
import LogInSignUp from "./logInSignUp";
import {
  createLocalStorageForUser,
  readLocalStorageForUser,
} from "../functions/localStorage";

export default function LandingPage({ userInfo, setUserInfo }) {
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
    }
  }, [userInfo]);

  if (!loggedIn) {
    return <LogInSignUp setUserInfo={setUserInfo} />;
  }

  return (
    <>
      <h1>To do</h1>
    </>
  );
}
