import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import {
  readProfileLocalStorage,
  readUserLocalStorage,
} from "./functions/localStorage";

import "./index.css";
import LandingPage from "./pages/home";
import ErrorPage from "./pages/errorPage";
import Footer from "./components/footer";
import Header from "./components/header";
import NewPost from "./pages/newPost";
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

  // search local storage for user and profile on page load
  useEffect(() => {
    if (!profile) {
      readProfileLocalStorage(setProfile);
    }
    if (!user) {
      readUserLocalStorage(setUser);
    }
  }, []);

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
          element: <NewPost profile={profile} user={user} />,
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
