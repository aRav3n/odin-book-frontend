import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import {
  readProfileLocalStorage,
  readUserLocalStorage,
  updateProfileLocalStorage,
} from "./functions/localStorage";
import { readProfile, wakeUpDatabase } from "./functions/apiCommunication";

import "./index.css";
import AddFriendsPage from "./pages/addFriends";
import LandingPage from "./pages/home";
import ErrorPage from "./pages/errorPage";
import Footer from "./components/footer";
import Friends from "./pages/friends";
import Header from "./components/header";
import ManageAccount from "./pages/manageAccount";
import NewPost from "./pages/newPost";
import ProfilePage from "./pages/profilePage";
import SideMenu from "./components/sidebar";

function Layout({ user, profile, setProfile }) {
  return (
    <>
      <Header user={user} profile={profile} setProfile={setProfile} />
      <div>
        <SideMenu profile={profile} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function TopLevel() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [databaseAwake, setDatabaseAwake] = useState(false);

  // search local storage for user and profile on page load
  useEffect(() => {
    if (!databaseAwake) {
      (async () => {
        const response = await wakeUpDatabase();
        console.log(response);
        setDatabaseAwake(true);
      })();
    }

    if (!profile || !user) {
      const localProfile = readProfileLocalStorage(setProfile);
      const localUser = readUserLocalStorage(setUser);
      if (localProfile && localUser) {
        (async () => {
          await readProfile(localProfile.id, localUser.token, setProfile);
        })();
      }
    }
  }, []);

  useEffect(() => {
    if (profile) {
    }
  }, [profile]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} profile={profile} setProfile={setProfile} />,
      children: [
        {
          index: true,
          element: (
            <LandingPage
              user={user}
              setUser={setUser}
              profile={profile}
              setProfile={setProfile}
            />
          ),
        },
        {
          path: "newPost",
          element: (
            <NewPost profile={profile} setProfile={setProfile} user={user} />
          ),
        },
        {
          path: "profile/:profileId",
          element: (
            <ProfilePage
              profile={profile}
              setProfile={setProfile}
              user={user}
            />
          ),
        },
        {
          path: "friends",
          element: <Friends />,
        },
        {
          path: "friends/add",
          element: <AddFriendsPage />,
        },
        {
          path: "manage-account",
          element: <ManageAccount />,
        },
      ],
      errorElement: (
        <ErrorPage user={user} profile={profile} setProfile={setProfile} />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TopLevel />
  </StrictMode>
);
