import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import {
  createLocalProfileStorage,
  readLocalProfileStorage,
} from "./functions/localStorage";
import { readUserProfile } from "./functions/apiCommunication";

import "./index.css";
import LandingPage from "./pages/home";
import ErrorPage from "./pages/errorPage";
import Footer from "./components/footer";
import Header from "./components/header";
import NewPost from "./pages/newPost";

function Layout({ userInfo, profileObject, setProfileObject }) {
  return (
    <>
      <Header
        userInfo={userInfo}
        profileObject={profileObject}
        setProfileObject={setProfileObject}
      />
      <Outlet />
      <Footer />
    </>
  );
}

function TopLevel() {
  const [userInfo, setUserInfo] = useState(null);
  const [profileObject, setProfileObject] = useState(null);

  // search local storage for user and profile on page load
  useEffect(() => {
    if (!profileObject) {
      const profile = readLocalProfileStorage();
      if (profile) {
        setProfileObject(profile);
      }
    }
    if (!userInfo) {
      const user = readLocalProfileStorage();
      if (user) {
        setUserInfo(user);
      }
    }
  }, []);

  // once user logs in get their profile, put it in local storage and state
  useEffect(() => {
    if (userInfo && !profileObject) {
      (async () => {
        const profile = await readUserProfile(userInfo.token);
        if (profile) {
          createLocalProfileStorage(profile);
          setProfileObject(profile);
        }
      })();
    }
  }, [userInfo]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
          userInfo={userInfo}
          profileObject={profileObject}
          setProfileObject={setProfileObject}
        />
      ),
      children: [
        {
          index: true,
          element: (
            <LandingPage
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              profileObject={profileObject}
              setProfileObject={setProfileObject}
            />
          ),
        },
        {
          path: "newPost",
          element: <NewPost />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TopLevel />
  </StrictMode>
);
