import { useEffect, useState } from "react";
import {
  readProfileOfUser,
  signupUser,
  logUserIn,
} from "../functions/apiCommunication";

import ErrorMessage from "../components/errorMessage";
import TopLogo from "../components/top_logo";

function ConfirmPassword({
  confirmPassword,
  setConfirmPassword,
  alreadyMember,
}) {
  if (alreadyMember) {
    return null;
  }

  return (
    <label htmlFor="confirmPassword">
      Confirm Password
      <small>Must match password</small>
      <input
        required
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
    </label>
  );
}

function SignupSuccess({ signedUp }) {
  if (!signedUp) {
    return null;
  }

  return (
    <div className="success">
      <strong>You're signed up!</strong>
    </div>
  );
}

export default function LogInSignUp({ user, setUser, setProfile }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorArray, setErrorArray] = useState(null);
  const [signedUp, setSignedUp] = useState(false);

  const [alreadyMember, setAlreadyMember] = useState(true);

  const textSnippet = alreadyMember ? "Log in" : "Sign up";
  const buttonText = alreadyMember ? "Log In" : "Sign Up";
  const switchText = alreadyMember
    ? " create a new account."
    : " log in to your existing account.";

  useEffect(() => {
    if (user) {
      console.log("user set");
    }
  }, [user]);

  function handleClick() {
    (async () => {
      // call correct function based on alreadyMember
      const info = alreadyMember
        ? await logUserIn(email, password, setUser)
        : await signupUser(email, password, confirmPassword);

      // if there are errors display them
      if (info.errors) {
        setErrorArray(info.errors);
      } else if (info.message === "Network error") {
        setErrorArray([info]);
      } else if (!alreadyMember) {
        setErrorArray(null);
        setSignedUp(true);
        setAlreadyMember(true);
      } else {
        await readProfileOfUser(info.token, setProfile);
      }
    })();
  }

  function handleMemberStatusSwitch() {
    const newMemberStatus = !alreadyMember;
    setAlreadyMember(newMemberStatus);
  }

  return (
    <>
      <main className="two-column">
        <div>
          <div>
            <h1>Odin Book</h1>
            <p className="wide-screen-only">
              {textSnippet} now and start connecting with your friends, or make
              some new ones!
            </p>
          </div>
        </div>
        <div>
          <div>
            <ErrorMessage errorArray={errorArray} />
            <SignupSuccess signedUp={signedUp} />
            <TopLogo />

            <form>
              <label htmlFor="email">
                {alreadyMember ? "Email" : "Email (required)"}
                <input
                  required
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <label htmlFor="password">
                Password
                {alreadyMember ? null :  <small>Must be 6-16 characters</small>}

                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <ConfirmPassword
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                alreadyMember={alreadyMember}
              />
              <button type="button" onClick={handleClick}>
                {buttonText}
              </button>
            </form>
            <hr />
            <p>
              Or
              <a
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMemberStatusSwitch}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleMemberStatusSwitch();
                  }
                }}
                tabIndex="0"
              >
                {switchText}
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
