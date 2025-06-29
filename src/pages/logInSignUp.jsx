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
      Confirm Password
    </label>
  );
}

export default function LogInSignUp({ user, setUser, setProfile }) {
  const [email, setEmail] = useState("c@b.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [errorArray, setErrorArray] = useState(null);

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
        : await signupUser(email, password, confirmPassword, setUser);

      // if there are errors display them
      if (info.errors) {
        setErrorArray(info.errors);
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
      <main>
        <div>
          <div>
            <h1>Odin Book</h1>
            <p className="wideScreenOnly">
              {textSnippet} now and start connecting with your friends, or make
              some new ones!
            </p>
          </div>
        </div>
        <div>
          <div>
            <ErrorMessage errorArray={errorArray} />
            <TopLogo />

            <form>
              <label htmlFor="email">
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
                Email
              </label>
              <label htmlFor="password">
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
                Password
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
