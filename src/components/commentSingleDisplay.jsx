import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CommentsDisplay from "./commentsDisplay";
import LikeButton from "./likeButton";
import CommentButton from "./commentButton";

export default function SingleCommentDisplay({
  comment,
  token,
  profileId,
  setNeedToUpdateComments,
}) {
  const [displayReplies, setDisplayReplies] = useState(false);
  const [commentCount, setCommentCount] = useState(comment._count.replies);
  const url = `/profile/${comment.Profile.id}`;

  return (
    <div>
      <div className="name">
        <img
          src={comment.Profile.avatarUrl}
          alt="avatar"
          className="avatar-medium"
        />{" "}
        <Link to={url}>{comment.Profile.name}</Link>
      </div>
      <div className="text">{comment.text}</div>
      <div className="buttons">
        <LikeButton
          likeCount={comment._count.likes}
          token={token}
          parentId={comment.id}
          profileId={profileId}
          parentIsPost={false}
          likesArray={comment.likes}
          setNeedToUpdateComments={setNeedToUpdateComments}
        />
        <CommentButton
          displayComments={displayReplies}
          setDisplayComments={setDisplayReplies}
          commentCount={commentCount}
          setNeedToUpdateComments={setNeedToUpdateComments}
        />
      </div>
      <CommentsDisplay
        commentCount={commentCount}
        setCommentCount={setCommentCount}
        parentIsPost={false}
        parentObject={comment}
        token={token}
        displayComments={displayReplies}
        profileId={profileId}
      />
    </div>
  );
}
