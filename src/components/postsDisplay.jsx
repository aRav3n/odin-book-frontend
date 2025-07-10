import { useState, useEffect } from "react";

import { readProfile, readRecentPosts } from "../functions/apiCommunication";

import CommentButton from "./commentButton";
import CommentsDisplay from "./commentsDisplay";
import ErrorMessage from "./errorMessage";
import LikeButton from "./likeButton";

async function getNewPosts(posts, setPosts, token, setErrorArray, profileId) {
  const startNumber = posts.length + 1;

  const response = profileId
    ? await readProfile(profileId, token, null)
    : await readRecentPosts(token, startNumber);

  const responsePosts = profileId ? response.posts : response;

  if (response.errors) {
    setErrorArray(response.errors);
  } else if (posts.length === 0) {
    setPosts(responsePosts);
  } else {
    const newArray = posts.concat(responsePosts);
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

function PostDisplay({ postObject, token, profileId, profileName }) {
  const [showFull, setShowFull] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  const name = postObject.Profile?.name ? postObject.Profile.name : profileName;
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

export default function GeneralPostsDisplay({
  profileObject,
  profileId,
  profileIdToDisplay,
  token,
}) {
  const [errorArray, setErrorArray] = useState(null);
  const [posts, setPosts] = useState([]);

  function updatePosts() {
    (async () => {
      await getNewPosts(
        posts,
        setPosts,
        token,
        setErrorArray,
        profileIdToDisplay
      );
    })();
  }

  useEffect(() => {
    if ((!posts || posts.length === 0) && setPosts !== null) {
      updatePosts();
    }
  }, []);

  if (posts.length === 0) {
    return (
      <>
        <p className="create-post-message">
          It looks like there aren't any posts to display.
        </p>
        <ErrorMessage errorArray={errorArray} />
      </>
    );
  }

  return (
    <div className="post-container">
      <p>To see more detail click on a post to expand it.</p>
      <ErrorMessage errorArray={errorArray} />

      {posts.map((post) => {
        return (
          <PostDisplay
            postObject={post}
            key={post.id}
            token={token}
            profileId={profileId}
            profileName={profileObject?.name || null}
          />
        );
      })}
    </div>
  );
}
