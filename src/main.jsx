import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/home";
import ErrorPage from "./pages/errorPage";
import Footer from "./components/footer";
import Header from "./components/header";

function TopLevel() {
  const [userInfo, setUserInfo] = useState(null);
  const [profileObject, setProfileObject] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingPage
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          profileObject={profileObject}
          setProfileObject={setProfileObject}
        />
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <Header
        userInfo={userInfo}
        profileObject={profileObject}
        setProfileObject={setProfileObject}
      />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TopLevel />
  </StrictMode>
);
