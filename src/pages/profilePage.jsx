import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  readProfileLocalStorage,
  readUserLocalStorage,
} from "../functions/localStorage";

import GeneralPostsDisplay from "../components/postsDisplay";

export default function ProfilePage() {
  const [heading, setHeading] = useState("Posts");
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const { profileId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const localProfile = readProfileLocalStorage(setProfile);
    const localUser = readUserLocalStorage(setUser);

    if (!localUser || !localProfile) {
      navigate("/");
    } else {
      setHeading(`${localProfile.name}'s Posts`);
    }
  }, []);

  if (!profile || !user) {
    return null;
  }

  return (
    <main className="profile-page">
      <h1>{heading}</h1>
      <GeneralPostsDisplay
        profileObject={profile}
        profileId={profile.id}
        profileIdToDisplay={profileId}
        token={user.token}
      />
    </main>
  );
}
