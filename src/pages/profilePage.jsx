import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  readProfileLocalStorage,
  readUserLocalStorage,
} from "../functions/localStorage";
import { readProfile } from "../functions/apiCommunication";

import GeneralPostsDisplay from "../components/postsDisplay";

export default function ProfilePage() {
  const [aboutMe, setAboutMe] = useState(
    "This profile currently have an about me."
  );
  const [heading, setHeading] = useState("Posts");
  const [profile, setProfile] = useState(null);
  const [profileToDisplay, setProfileToDisplay] = useState(null);
  const [user, setUser] = useState(null);
  const [website, setWebsite] = useState(
    "This profile currently doesn't have a website."
  );
  const { profileId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const localProfile = readProfileLocalStorage(setProfile);
    const localUser = readUserLocalStorage(setUser);

    if (!localUser || !localProfile) {
      navigate("/");
    } else {
      (async () => {
        await readProfile(profileId, localUser.token, setProfileToDisplay);
      })();
    }
  }, []);

  useEffect(() => {
    if (profileToDisplay) {
      setHeading(`${profileToDisplay.name}`);
      const newAbout =
        profileToDisplay.about.length > 0
          ? profileToDisplay.about
          : `${profileToDisplay.name} doesn't have an about me.`;
      const newWebsite =
        profileToDisplay.website.length > 0
          ? profileToDisplay.website
          : `${profileToDisplay.name} doesn't have a website listed.`;
      setAboutMe(newAbout);
      setWebsite(newWebsite);
    }
  }, [profileToDisplay]);

  useEffect(() => {
    if (profileToDisplay && profileId !== profileToDisplay.id) {
      window.location.reload();
    }
  }, [profileId]);

  if (!profile || !user) {
    return null;
  }

  return (
    <main className="profile-page">
      <h1>
        {profileToDisplay ? (
          <img
            src={profileToDisplay.avatarUrl}
            alt="avatar"
            className="avatar-large"
          />
        ) : null}
        {heading}
      </h1>
      <div className="two-column">
        <div>
          <strong>
            {profileToDisplay ? `About ${profileToDisplay.name}:` : "About Me:"}{" "}
          </strong>
          <p>{aboutMe}</p>
        </div>
        <div>
          <strong>
            {profileToDisplay
              ? `${profileToDisplay.name}'s website:`
              : "My Website:"}{" "}
          </strong>
          <p>{website}</p>
        </div>
      </div>
      <GeneralPostsDisplay
        profileObject={profileToDisplay}
        profileId={profile.id}
        profileIdToDisplay={profileId}
        token={user.token}
      />
    </main>
  );
}
