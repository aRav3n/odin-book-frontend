import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/home";
import ErrorPage from "./pages/errorPage";

function TopLevel() {
  const [userInfo, setUserInfo] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingPage
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      ),
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
