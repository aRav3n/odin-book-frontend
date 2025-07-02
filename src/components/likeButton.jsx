import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";

import { createLike, deleteLike } from "../functions/apiCommunication";

export default function LikeButton({
  likeCount,
  token,
  parentId,
  profileId,
  parentIsPost,
  likesArray,
}) {
  const [profileHasLiked, setProfileHasLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  const [likeId, setLikeId] = useState(null);

  // change profileHasLiked if likesArray changes
  useEffect(() => {
    if (likesArray.length > 0) {
      setProfileHasLiked(true);
      setLikeId(likesArray[0].id);
    } else {
      setProfileHasLiked(false);
    }
  }, [likesArray]);

  function handleClick() {
    if (!profileHasLiked) {
      (async () => {
        const response = await createLike(
          token,
          parentId,
          profileId,
          parentIsPost
        );

        if (!response.errors) {
          setLikeId(response.id);
          setLikes(likes + 1);
          setProfileHasLiked(true);
        }
      })();
    } else {
      (async () => {
        const response = await deleteLike(token, likeId);

        if (!response.errors) {
          setLikeId(null);
          setLikes(likes - 1);
          setProfileHasLiked(false);
        }
      })();
    }
  }

  return (
    <button
      type="button"
      className={profileHasLiked ? "liked" : ""}
      onClick={handleClick}
    >
      <ThumbsUp /> {likes}
    </button>
  );
}
