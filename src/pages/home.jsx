import { useEffect, useState } from "react";
import {
  deleteProfileLocalStorage,
  deleteUserLocalStorage,
} from "../functions/localStorage";

import GeneralPostsDisplay from "../components/postsDisplay";
import LogInSignUp from "./logInSignUp";
import ProfileCreationPage from "./profileCreation";

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
      <main>
        <GeneralPostsDisplay
          profileObject={profile}
          profileId={profile.id}
          profileIdToDisplay={null}
          token={user.token}
        />
      </main>
    </>
  );
}
