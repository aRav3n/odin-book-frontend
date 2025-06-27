import { Link } from "react-router-dom";

import { SquarePlus, UserCog } from "lucide-react";

export default function Header({ userInfo, profileObject, setProfileObject }) {
  if (!userInfo) {
    return (
      <header>
        <div></div>
        <div>Log in to interact</div>
        <div></div>
      </header>
    );
  } else if (!profileObject) {
    return (
      <header>
        <div></div>
        <div>Now make your profile</div>
        <div></div>
      </header>
    );
  }
  return (
    <header>
      <div>
        <Link to="/">
          <img
            src="https://cdn.brandfetch.io/idqq2v1naO/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"
            alt="Odin Project logo"
          />{" "}
          Home
        </Link>
      </div>
      <button type="button">
        <SquarePlus className="icon" /> New Post
      </button>
      <button type="button">
        <UserCog className="icon" />
      </button>
    </header>
  );
}
