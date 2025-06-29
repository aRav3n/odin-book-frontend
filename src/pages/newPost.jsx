import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost({ profile }) {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate("/");
    }
  });

  function handleClick() {}

  return (
    <main className="singleColumn">
      <form>
        <textarea
          className="post"
          name="text"
          id="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <button type="button">Submit Post</button>
      </form>
    </main>
  );
}
