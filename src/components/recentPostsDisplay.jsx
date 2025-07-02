import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CommentsDisplay from "./commentsDisplay";
import LikeButton from "./likeButton";
import CommentButton from "./commentButton";

import { readRecentPosts } from "../functions/apiCommunication";

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

function PostDisplay({ postObject, token, profileId }) {
  const [showFull, setShowFull] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  const name = postObject.Profile.name;
  const text = postObject.text;
  const date = formatDate(postObject.createdAt);

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
            <LikeButton
              likeCount={postObject._count.likes}
              token={token}
              parentId={postObject.id}
              profileId={profileId}
              parentIsPost={true}
              likesArray={postObject.likes}
            />
            <CommentButton
              displayComments={displayComments}
              setDisplayComments={setDisplayComments}
              commentCount={postObject._count.comments}
            />
          </div>
          <CommentsDisplay
            parentIsPost={true}
            parentObject={postObject}
            token={token}
            displayComments={displayComments}
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
