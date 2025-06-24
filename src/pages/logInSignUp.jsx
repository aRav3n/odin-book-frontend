import { useState } from "react";

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

export default function LogInSignUp() {
  const [alreadyMember, setAlreadyMember] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const textSnippet = alreadyMember ? "Log in" : "Sign up";
  const buttonText = alreadyMember ? "Log In" : "Sign Up";
  const switchText = alreadyMember
    ? "create a new account"
    : "log in to your existing account";

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
            <img
              src="https://cdn.brandfetch.io/idqq2v1naO/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"
              alt="Odin Project logo"
            />
            <form>
              <label htmlFor="username">
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                Username
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
              <button type="button">{buttonText}</button>
            </form>
            <hr />
            <p>
              Or{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  const newMemberStatus = !alreadyMember;
                  setAlreadyMember(newMemberStatus);
                }}
              >
                {switchText}
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
