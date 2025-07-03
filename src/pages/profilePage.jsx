import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { readProfile } from "../functions/apiCommunication";

import ErrorMessage from "../components/errorMessage";

export default function ProfilePage({ profile, setProfile, user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !profile) {
      navigate("/");
    }
  });

  console.log(profile);

  const [errorArray, setErrorArray] = useState(null);
  const [heading, setHeading] = useState("Posts");
  const [token, setToken] = useState(null);
  const { profileId } = useParams();

  async function refreshProfileFromDatabase() {
    const response = await readProfile(profileId, token, setProfile);

    if (response.errors) {
      setErrorArray(response.errors);
    }
  }

  useEffect(() => {
    setHeading(`${profile.name}'s Posts`);
    setToken(user.token);
  }, [profile, user]);

  return (
    <main className="profilePage">
      <h1>{heading}</h1>
      <ErrorMessage errorArray={errorArray} />
    </main>
  );
}
