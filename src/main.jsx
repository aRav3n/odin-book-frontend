import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/home";
import ErrorPage from "./pages/errorPage";
import Footer from "./components/footer";
import Header from "./components/header";

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
