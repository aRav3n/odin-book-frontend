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
  const parentId = parentObject.id;

  async function updateComments() {
    const response = await readComments(token, parentId, parentIsPost);

    if (response.errors) {
      setErrorArray(response.errors);
    } else {
      setComments(response);
    }
  }

  useEffect(() => {
    (async () => {
      await updateComments();
    })();
  }, []);

  return (
    <>
      <CommentBox
        parentObject={parentObject}
        displayComments={displayComments}
        token={token}
        profileId={profileId}
        parentIsPost={parentIsPost}
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
                key={`comment-${comment.id}`}
              />
            );
          })
        )}
      </div>
    </>
  );
}
