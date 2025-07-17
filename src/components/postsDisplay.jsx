import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  readProfile,
  readRecentPosts,
  readSinglePost,
} from "../functions/apiCommunication";

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

function PostDisplay({
  postObject,
  token,
  profileId,
  profileName,
  setPostIdToUpdate,
}) {
  const [showFull, setShowFull] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);

  const avatarUrl = postObject.Profile.avatarUrl;
  const date = formatDate(postObject.createdAt);
  const name = postObject.Profile?.name ? postObject.Profile.name : profileName;
  const text = postObject.text;
  const url = `/profile/${postObject.Profile.id}`;

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
          <div className="name">
            <img src={avatarUrl} alt="avatar" className="avatar-medium" />{" "}
            <Link to={url}>{name}</Link>
          </div>
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
  const [postIdToUpdate, setPostIdToUpdate] = useState(null);

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
    if (!posts) {
      return null;
    }
  }, []);

  function updateSinglePost(id) {
    (async () => {
      try {
        const indexOfPost = posts.findIndex((item) => item.id === id);
        const postsBeforeThisPost = posts.slice(0, indexOfPost);
        const postsAfterThisPost = posts.slice(indexOfPost + 1);
        const refreshedPost = await readSinglePost(token, id);

        const newArray = postsBeforeThisPost.concat(
          [refreshedPost],
          postsAfterThisPost
        );
        setPosts(newArray);
      } catch (error) {
        console.error(error);
      }
    })();
  }

  useEffect(() => {
    if ((!posts || posts.length === 0) && setPosts !== null) {
      updatePosts();
    }
  }, []);

  useEffect(() => {
    if (postIdToUpdate) {
      updateSinglePost(postIdToUpdate);
      setPostIdToUpdate(null);
    }
  }, postIdToUpdate);

  if (!posts || isNaN(posts.length)) {
    return null;
  }

  if (posts && posts.length === 0) {
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

      {posts
        ? posts.map((post) => {
            return (
              <PostDisplay
                postObject={post}
                key={post.id}
                token={token}
                profileId={profileId}
                profileName={profileObject?.name || null}
                setPostIdToUpdate={setPostIdToUpdate}
              />
            );
          })
        : null}
    </div>
  );
}
