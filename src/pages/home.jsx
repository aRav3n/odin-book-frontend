import { useState } from "react";
import LogInSignUp from "./logInSignUp";

export default function LandingPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  return <>{loggedIn ? null : <LogInSignUp />}</>;
}
