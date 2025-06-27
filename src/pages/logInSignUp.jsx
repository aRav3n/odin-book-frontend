import { useState } from "react";
import { userSignUp, userLogIn } from "../functions/apiCommunication";
import {
  // user functions
  createLocalStorageForUser,
  readLocalStorageForUser,
  updateLocalStorageForUser,
  deleteLocalStorageForUser,

  // profile functions
  createLocalProfileStorage,
  readLocalProfileStorage,
  updateLocalProfileStorage,
  deleteLocalProfileStorage,
} from "../functions/localStorage";

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

export default function LogInSignUp({ setUserInfo }) {
  const [alreadyMember, setAlreadyMember] = useState(true);
  const [email, setEmail] = useState("a@b.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [errorArray, setErrorArray] = useState(null);

  const textSnippet = alreadyMember ? "Log in" : "Sign up";
  const buttonText = alreadyMember ? "Log In" : "Sign Up";
  const switchText = alreadyMember
    ? " create a new account."
    : " log in to your existing account.";

  function handleClick() {
    (async () => {
      const info = alreadyMember
        ? await userLogIn(email, password)
        : await userSignUp(email, password, confirmPassword);
      if (info.errors) {
        setErrorArray(info.errors);
      } else {
        createLocalStorageForUser(info);
        setUserInfo(info);
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
