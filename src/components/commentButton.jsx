import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

export default function CommentButton({
  displayComments,
  setDisplayComments,
  commentCount,
  setParentIdForUpdate,
}) {
  return (
    <button
      type="button"
      onClick={() => {
        const newDisplayBool = !displayComments;
        setDisplayComments(newDisplayBool);
      }}
    >
      <MessageSquare /> {commentCount}
    </button>
  );
}
