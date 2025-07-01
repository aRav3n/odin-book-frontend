import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  MessageSquareOff,
  MessageSquareShare,
  ThumbsUp,
} from "lucide-react";

import {
  createCommentOnPost,
  readRecentPosts,
} from "../functions/apiCommunication";

async function getNewPosts(posts, setPosts, token, setErrorArray) {
  const startNumber = posts.length + 1;

  const response = await readRecentPosts(token, startNumber);

  if (response.errors) {
    setErrorArray(response.errors);
  } else if (posts.length === 0) {
    setPosts(response);
  } else {
    const newArray = posts.concat(response);
    setPosts(newArray);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const dayOptions = {
    month: "short",
    day: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const day = date.toLocaleString("en-US", dayOptions).replace(",", "");
  const time = date.toLocaleString("en-US", timeOptions).replace(",", "");

  return `${day} at ${time}`;
}

function CommentBox({
  postObject,
  displayComments,
  setDisplayComments,
  token,
  profileId,
}) {
  const [commenting, setCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!commenting) {
      setCommentText("");
    }
  }, [commenting]);

  function handleComment() {
    (async () => {
      const response = await createCommentOnPost(
        token,
        postObject.id,
        profileId,
        commentText
      );
      console.log(response);
    })();
    setCommentText("");
    setCommenting(false);
  }

  function noCommenting() {
    setCommentText("");
    setCommenting(false);
  }

  if (!displayComments) {
    return null;
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

function PostDisplay({ postObject, token, profileId }) {
  const [showFull, setShowFull] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  const id = postObject.id;
  const name = postObject.Profile.name;
  const text = postObject.text;
  const postId = postObject.id;
  const date = formatDate(postObject.createdAt);
  const commentCount = postObject._count.comments;
  const likeCount = postObject._count.likes;

  useEffect(() => {
    if (!showFull) {
      setDisplayComments(false);
    }
  }, [showFull]);

  return (
    <div className="post full">
      <div
        tabIndex="0"
        onClick={() => {
          const newBool = !showFull;
          setShowFull(newBool);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            const newBool = !showFull;
            setShowFull(newBool);
          }
        }}
      >
        <div>
          <div className="name">{name}</div>
          {showFull ? <div className="date">{date}</div> : null}
        </div>
        <div className="text">{text}</div>
      </div>
      {showFull ? (
        <>
          <div>
            <button type="button">
              <ThumbsUp /> {likeCount}
            </button>
            <button
              type="button"
              onClick={() => {
                const newDisplayBool = !displayComments;
                setDisplayComments(newDisplayBool);
              }}
            >
              <MessageSquare /> {commentCount}
            </button>
          </div>
          <CommentBox
            postObject={postObject}
            displayComments={displayComments}
            setDisplayComments={setDisplayComments}
            token={token}
            profileId={profileId}
          />
        </>
      ) : null}
    </div>
  );
}

export default function RecentPostDisplay({ token, profileId }) {
  const [errorArray, setErrorArray] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postForComments, setPostForComments] = useState(null);

  function updatePosts() {
    (async () => {
      await getNewPosts(posts, setPosts, token, setErrorArray);
    })();
  }

  useEffect(() => {
    updatePosts();
  }, []);

  if (posts.length === 0) {
    return (
      <p className="createPostMessage">
        It looks like there aren't any posts to display; feel free to{" "}
        <Link to="/newPost">create</Link>
        {""} a new one.
      </p>
    );
  }

  return (
    <div className="postContainer">
      <p>To see more detail click on a post to expand it.</p>

      {posts.map((post) => {
        return (
          <PostDisplay
            postObject={post}
            key={post.id}
            token={token}
            profileId={profileId}
          />
        );
      })}
    </div>
  );
}
