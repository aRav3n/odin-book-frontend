import { useRouteError } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";

export default function ErrorPage({ user, profile, setProfile }) {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header user={user} profile={profile} setProfile={setProfile} />
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {error.status} : {error.statusText || error.message}
          </i>
        </p>
      </div>
      <Footer />
    </>
  );
}
