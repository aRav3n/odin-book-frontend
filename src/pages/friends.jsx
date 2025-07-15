import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  readProfileLocalStorage,
  readUserLocalStorage,
} from "../functions/localStorage";
import { readFollowers, readFollowing } from "../functions/apiCommunication";

import ErrorMessage from "../components/errorMessage";

export default function Friends() {
  const [followerErrorArray, setFollowerErrorArray] = useState(null);
  const [followingErrorArray, setFollowingErrorArray] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // check for user and profile in local storage and set them to state
    if (!user) {
      const localUser = readUserLocalStorage(setUser);
      if (!localUser) {
        navigate("/");
      }
    }
    if (!profile) {
      const localProfile = readProfileLocalStorage(setProfile);
      if (!localProfile) {
        navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    if (user && profile) {
      (async () => {
        await readFollowing(
          user.token,
          profile.id,
          setFollowing,
          setFollowingErrorArray
        );

        await readFollowers(
          user.token,
          profile.id,
          setFollowers,
          setFollowerErrorArray
        );
      })();
    }
  }, [user, profile]);

  if (!user || !profile) {
    return null;
  }

  return (
    <main className="two-column">
      <div>
        <ErrorMessage errorArray={followingErrorArray} />
        <h2>Following</h2>
        <ul className="profile-list">
          {following.map((follow) => {
            return (
              <li key={`following-${follow.id}`}>
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/profile/${follow.following.id}`);
                  }}
                >
                  <img src={follow.following.avatarUrl} alt="" className="avatar-medium"/> {follow.following.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <ErrorMessage errorArray={followerErrorArray} />
        <h2>Followers</h2>
        <ul className="profile-list">
          {followers.map((follow) => {
            return (
              <li key={`follower-${follow.id}`}>
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/profile/${follow.follower.id}`);
                  }}
                >
                  <img src={follow.follower.avatarUrl} alt="" className="avatar-medium"/> {follow.follower.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
