import { useState } from "react";

export default function NewPost() {
  const [text, setText] = useState("");

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
