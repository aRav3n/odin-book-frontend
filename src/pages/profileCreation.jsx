import { useState } from "react";
import {
  createProfile,
  readProfileOfUser,
} from "../functions/apiCommunication";

import ErrorMessage from "../components/errorMessage";

export default function ProfileCreationPage({ user, setProfile }) {
  const [about, setAbout] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errorArray, setErrorArray] = useState(null);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");

  function handleClick() {
    (async () => {
      const response = await createProfile(
        name,
        about,
        avatarUrl,
        website,
        user.token,
        setProfile
      );

      if (response.errors) {
        // if the profile already exists get it then set it in state and local storage
        if (
          response.errors[0].message ===
          "A profile for this account already exists"
        ) {
          const profile = await readProfileOfUser(user.token, setProfile);

          if (profile.errors) {
            setErrorArray(profile.errors);
          }
        } else {
          setErrorArray(response.errors);
        }

        // if the profile didn't already exist set it in state and local storage
      }
      setName("");
      setAbout("");
      setWebsite("");
    })();
  }

  return (
    <main className="two-column">
      <div>
        <div>
          <ErrorMessage errorArray={errorArray} />
          <p>Now that you have an account let's get your profile completed!</p>
        </div>
      </div>
      <div>
        <form>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label htmlFor="avatarUrl">
            Profile Picture URL
            <small>(optional)</small>
            <input
              type="url"
              name="avatarUrl"
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
              }}
            />
          </label>
          <label htmlFor="website">
            My Website <small>(optional)</small>
            <input
              type="url"
              name="website"
              id="website"
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
          </label>
          <label htmlFor="about">
            About Me <small>(optional)</small>
            <textarea
              name="about"
              id="about"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            ></textarea>
          </label>
          <button type="button" onClick={handleClick}>
            Create My Profile!
          </button>
        </form>
      </div>
    </main>
  );
}
