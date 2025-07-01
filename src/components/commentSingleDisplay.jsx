import { useEffect, useState } from "react";
import { MessageSquare, ThumbsUp } from "lucide-react";

import ErrorMessage from "./errorMessage";
import CommentsDisplay from "./commentsDisplay";
import LikeButton from "./likeButton";
import CommentButton from "./commentButton";

import { readComments } from "../functions/apiCommunication";

export default function SingleCommentDisplay({ comment, token, profileId }) {
  const [displayReplies, setDisplayReplies] = useState(false);

  return (
    <div>
      <div className="name">{comment.Profile.name}</div>
      <div className="text">{comment.text}</div>
      <div className="buttons">
        <LikeButton likeCount={comment._count.likes} />
        <CommentButton
          displayComments={displayReplies}
          setDisplayComments={setDisplayReplies}
          commentCount={comment._count.replies}
        />
      </div>
      <CommentsDisplay
        parentIsPost={false}
        parentObject={comment}
        token={token}
        displayComments={displayReplies}
        profileId={profileId}
      />
    </div>
  );
}
