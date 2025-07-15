import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  readProfileLocalStorage,
  readUserLocalStorage,
  deleteProfileLocalStorage,
  deleteUserLocalStorage,
} from "../functions/localStorage";

export default function ManageAccount() {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = readUserLocalStorage(setUser);
    const localProfile = readProfileLocalStorage(setProfile);

    if (!localProfile || !localUser) {
      navigate("/");
    }
  }, []);

  function handleClick() {
    deleteProfileLocalStorage(setProfile);
    deleteUserLocalStorage(setUser);
    window.location.reload();
  }

  return (
    <main>
      <button type="button" onClick={handleClick}>
        Log Out
      </button>
    </main>
  );
}
