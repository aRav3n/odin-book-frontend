import { useEffect, useState } from "react";
import {
  deleteProfileLocalStorage,
  deleteUserLocalStorage,
} from "../functions/localStorage";

import LogInSignUp from "./logInSignUp";
import ProfileCreationPage from "./profileCreation";
import SideMenu from "../components/sidebar";

export default function LandingPage({ user, setUser, profile, setProfile }) {
  const [loggedIn, setLoggedIn] = useState(false);

  // actions to be performed when user changes
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else if (!user && loggedIn) {
      // remove user and profile from local storage then set loggedIn to false
      // deleteLocalProfileStorage();
      // deleteLocalStorageForUser();
      // setProfile(null);
      // setUser(null);
      // setLoggedIn(false);
    }
  }, [user]);

  if (!user) {
    return (
      <LogInSignUp user={user} setUser={setUser} setProfile={setProfile} />
    );
  }
  if (user && !profile) {
    return <ProfileCreationPage user={user} setProfile={setProfile} />;
  }

  return (
    <>
      <div>
        <SideMenu />
        <main>
          <h1>Home page</h1>
        </main>
      </div>
    </>
  );
}
