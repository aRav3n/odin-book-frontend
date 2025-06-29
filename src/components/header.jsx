import { useNavigate } from "react-router-dom";

import { SquarePlus, UserCog } from "lucide-react";
import TopLogo from "./top_logo";

export default function Header({ user, profile, setProfile }) {
  if (!user) {
    return (
      <header>
        <div></div>
        <div>Log in to interact</div>
        <div></div>
      </header>
    );
  } else if (!profile) {
    return (
      <header>
        <div></div>
        <div>Now you can complete your profile</div>
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
