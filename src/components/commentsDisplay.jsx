import { useEffect, useState } from "react";

import ErrorMessage from "./errorMessage";
import CommentBox from "./commentBox";
import SingleCommentDisplay from "./commentSingleDisplay";

import { readComments } from "../functions/apiCommunication";

export default function CommentsDisplay({
  parentIsPost,
  parentObject,
  token,
  displayComments,
  profileId,
}) {
  if (!displayComments) {
    return null;
  }

  const [comments, setComments] = useState([]);
  const [errorArray, setErrorArray] = useState(null);
  const [needToUpdateComments, setNeedToUpdateComments] = useState(false);
  const parentId = parentObject.id;

  function updateComments() {
    (async () => {
      const response = await readComments(token, parentId, parentIsPost);

      if (response.errors) {
        setErrorArray(response.errors);
      } else {
        setComments(response);
      }
    })();
  }

  useEffect(() => {
    if (comments.length === 0 || needToUpdateComments) {
      updateComments();
      if (needToUpdateComments) {
        setNeedToUpdateComments(false);
      }
    }
  }, [needToUpdateComments]);

  return (
    <>
      <CommentBox
        parentObject={parentObject}
        displayComments={displayComments}
        token={token}
        profileId={profileId}
        parentIsPost={parentIsPost}
        setNeedToUpdateComments={setNeedToUpdateComments}
      />
      <div className="child-comments">
        <ErrorMessage errorArray={errorArray} />
        {comments.length === 0 ? (
          <p>There are currently no comments, be the first!</p>
        ) : (
          comments.map((comment) => {
            return (
              <SingleCommentDisplay
                comment={comment}
                token={token}
                profileId={profileId}
                setNeedToUpdateComments={setNeedToUpdateComments}
                key={`comment-${comment.id}`}
              />
            );
          })
        )}
      </div>
    </>
  );
}
