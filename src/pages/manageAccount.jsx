import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  readProfileLocalStorage,
  readUserLocalStorage,
  deleteProfileLocalStorage,
  deleteUserLocalStorage,
} from "../functions/localStorage";
import { updateProfile } from "../functions/apiCommunication";

export default function ManageAccount() {
  const [about, setAbout] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [website, setWebsite] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = readUserLocalStorage(setUser);
    const localProfile = readProfileLocalStorage(setProfile);

    if (!localProfile || !localUser) {
      navigate("/");
    } else {
      localProfile.about ? setAbout(localProfile.about) : null;
      localProfile.avatarUrl ? setAvatarUrl(localProfile.avatarUrl) : null;
      localProfile.name ? setName(localProfile.name) : null;
      localProfile.website ? setWebsite(localProfile.website) : null;
    }
  }, []);

  function handleLogOutClick() {
    deleteProfileLocalStorage(setProfile);
    deleteUserLocalStorage(setUser);
    window.location.reload();
  }

  function handleUpdateClick() {
    (async () => {
      const res = await updateProfile(
        name,
        about,
        avatarUrl,
        website,
        profile.id,
        user.token,
        null
      );
      navigate(`/profile/${profile.id}`);
    })();
  }

  return (
    <main>
      <button type="button" onClick={handleLogOutClick}>
        Log Out
      </button>
      <div>
        <hr />
        <p>
          Update any items you want to change, otherwise you can leave them as
          they are.
        </p>
        <form>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label htmlFor="avatarUrl">
            Profile Picture URL
            <input
              type="url"
              name="avatarUrl"
              id="avatarUrl"
              placeholder="Currently blank"
              value={avatarUrl}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
              }}
            />
          </label>
          <label htmlFor="website">
            Website
            <input
              type="url"
              name="website"
              id="website"
              placeholder="Currently blank"
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
          </label>

          <label htmlFor="about">
            About Me
            <textarea
              name="about"
              id="about"
              placeholder="Currently blank"
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            ></textarea>
          </label>
          <button type="button" onClick={handleUpdateClick}>
            Update My Profile
          </button>
        </form>
      </div>
    </main>
  );
}
