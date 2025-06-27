import { Link, useNavigate } from "react-router-dom";

import { SquarePlus, UserCog } from "lucide-react";
import TopLogo from "./top_logo";

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

  const navigate = useNavigate();
  return (
    <header>
      <button
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        <TopLogo /> Home
      </button>
      <button
        type="button"
        onClick={() => {
          navigate("/newPost");
        }}
      >
        <SquarePlus className="icon" /> New Post
      </button>
      <button type="button">
        <UserCog className="icon" />
      </button>
    </header>
  );
}
