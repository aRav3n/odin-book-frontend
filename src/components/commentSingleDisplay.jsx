import { useEffect, useState } from "react";
import { MessageSquare, ThumbsUp } from "lucide-react";

import ErrorMessage from "./errorMessage";
import CommentBox from "./commentBox";
import CommentsDisplay from "./commentsDisplay";

import { readComments } from "../functions/apiCommunication";

export default function SingleCommentDisplay({ comment, token, profileId }) {
  const [displayReplies, setDisplayReplies] = useState(false);

  return (
    <div>
      <div className="name">{comment.Profile.name}</div>
      <div className="text">{comment.text}</div>
      <div className="buttons">
        <button type="button">
          <ThumbsUp />
          {` ${comment._count.likes}`}
        </button>
        <button
          type="button"
          onClick={() => {
            const newBool = !displayReplies;
            setDisplayReplies(newBool);
          }}
        >
          <MessageSquare />
          {` ${comment._count.replies}`}
        </button>
      </div>
      <CommentBox
        parentObject={comment}
        displayComments={displayReplies}
        token={token}
        profileId={profileId}
        parentIsPost={false}
      />
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
