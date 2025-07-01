import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";

export default function LikeButton({ likeCount }) {
  return (
    <button type="button">
      <ThumbsUp /> {likeCount}
    </button>
  );
}
