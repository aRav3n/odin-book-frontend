import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSearch } from "lucide-react";

import {
  readProfileLocalStorage,
  readUserLocalStorage,
} from "../functions/localStorage";
import { createFollow, readProfileList } from "../functions/apiCommunication";

function ProfileListDisplay({ currentProfile, profileList, user }) {
  const navigate = useNavigate();

  if (!currentProfile || !user) {
    return null;
  }

  return (
    <ul className="profile-list">
      {profileList.map((profile) => {
        if (profile.id === currentProfile.id) {
          return null;
        }

        function handleClick() {
          (async () => {
            await createFollow(user.token, profile.id, currentProfile.id);

            navigate("/friends");
          })();
        }

        return (
          <li key={`potential-follow-id-${profile.id}`}>
            <img src={profile.avatarUrl} alt="" className="avatar-medium" />
            {`${profile.name} - `}{" "}
            <button type="button" onClick={handleClick}>
              Add Friend
            </button>{" "}
          </li>
        );
      })}
    </ul>
  );
}

export default function AddFriendsPage() {
  const [profile, setProfile] = useState(null);
  const [profileList, setProfileList] = useState([]);
  const [stringToMatch, setStringToMatch] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // set user and profile from local storage
  useEffect(() => {
    const localUser = readUserLocalStorage(setUser);
    const localProfile = readProfileLocalStorage(setProfile);
    if (!localProfile || !localUser) {
      navigate("/");
    }
  }, []);

  function handleClick() {
    (async () => {
      await readProfileList(stringToMatch, user.token, setProfileList);
    })();
    setStringToMatch("");
  }

  return (
    <main>
      <p>Add new friends!</p>
      <form className="search-bar">
        <label htmlFor="string">
          <input
            type="text"
            name="string"
            id="string"
            value={stringToMatch}
            onChange={(e) => {
              setStringToMatch(e.target.value);
            }}
          />
          <button type="button" onClick={handleClick}>
            <UserSearch /> Search
          </button>
        </label>
      </form>
      <ProfileListDisplay
        currentProfile={profile}
        profileList={profileList}
        user={user}
      />
    </main>
  );
}
