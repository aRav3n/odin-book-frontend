import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../components/errorMessage";
import { createPost } from "../functions/apiCommunication";

export default function NewPost({ profile, setProfile, user }) {
  const [errorArray, setErrorArray] = useState(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate("/");
    }
  });

  function handleClick() {
    (async () => {
      if (!text) {
        setErrorArray([{ message: "Cannot submit a blank post" }]);
      } else {
        const response = await createPost(
          text,
          user.token,
          profile.id,
          setProfile
        );

        if (response.errors) {
          setErrorArray(response.errors);
        } else {
          navigate("/");
        }
      }
    })();
  }

  return (
    <main className="single-column">
      <ErrorMessage errorArray={errorArray} />
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
        <button type="button" onClick={handleClick}>
          Submit Post
        </button>
      </form>
    </main>
  );
}
