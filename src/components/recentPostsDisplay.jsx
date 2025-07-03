import { useState } from "react";
import GeneralPostsDisplay from "./postsDisplay";

export default function RecentPostDisplay({ token, profileId }) {
  const [posts, setPosts] = useState([]);

  return (
    <GeneralPostsDisplay
      posts={posts}
      setPosts={setPosts}
      profileId={profileId}
      profileIdToDisplay={null}
      token={token}
    />
  );
}
