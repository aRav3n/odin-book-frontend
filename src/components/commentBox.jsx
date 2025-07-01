import { useState, useEffect } from "react";
import { MessageSquareOff, MessageSquareShare } from "lucide-react";

import { createComment } from "../functions/apiCommunication";

export default function CommentBox({
  parentObject,
  displayComments,
  token,
  profileId,
  parentIsPost,
}) {
  if (!displayComments) {
    return null;
  }

  const [commenting, setCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!commenting) {
      setCommentText("");
    }
  }, [commenting]);

  function handleComment() {
    (async () => {
      const response = await createComment(
        token,
        parentObject.id,
        profileId,
        commentText,
        parentIsPost
      );
    })();
    setCommentText("");
    setCommenting(false);
  }

  function noCommenting() {
    setCommentText("");
    setCommenting(false);
  }

  return (
    <div className="comments">
      <div>
        <textarea
          placeholder="What do you think?"
          name="text"
          id="text"
          className={commenting ? "tall" : "short"}
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
          onClick={(e) => {
            if (e.currentTarget && !commenting) {
              setCommenting(true);
            }
          }}
        ></textarea>
        {commenting ? (
          <div className="buttons">
            <button type="button" onClick={handleComment}>
              <MessageSquareShare />
              Comment
            </button>
            <button
              type="button"
              onClick={() => {
                noCommenting();
              }}
            >
              <MessageSquareOff />
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
