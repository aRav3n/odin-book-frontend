// apiCommunication enters object into local storage if successful and applicable
import {
  createProfileLocalStorage,
  createUserLocalStorage,
} from "./localStorage";

async function getJsonResponse(urlExtension, method, token, bodyObject) {
  const apiUrl = "http://localhost:3000";

  const url = `${apiUrl}${urlExtension}`;
  const fetchObject = {
    method,
  };
  if (method !== "GET") {
    const body = JSON.stringify(bodyObject);
    fetchObject.body = body;
  }
  if (token) {
    fetchObject.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    fetchObject.headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(url, fetchObject);
    const result = await response.json();

    if (!response.ok) {
      return {
        error: true,
        status: response.status,
        data: result,
      };
    }

    return result;
  } catch (error) {
    return {
      error: true,
      status: 0,
      data: { message: "Network error" },
    };
  }
}

// user functions
async function logUserIn(email, password, setState) {
  const bodyObject = { email, password };
  const method = "POST";
  const urlExtension = "/user/login";

  const response = await getJsonResponse(
    urlExtension,
    method,
    null,
    bodyObject
  );

  if (response.error) {
    return response.data;
  } else {
    createUserLocalStorage(response, setState);
  }

  return response;
}

async function signupUser(email, password, confirmPassword) {
  const bodyObject = { email, password, confirmPassword };
  const method = "POST";
  const urlExtension = "/user";

  const response = await getJsonResponse(
    urlExtension,
    method,
    null,
    bodyObject
  );

  if (response.error) {
    return response.data;
  }

  return response;
}

// profile functions
async function createProfile(name, about, website, token, setState) {
  const bodyObject = { name, about, website };
  const method = "POST";
  const urlExtension = "/profile";

  const response = await getJsonResponse(
    urlExtension,
    method,
    token,
    bodyObject
  );

  if (response.error) {
    return response.data;
  }

  createProfileLocalStorage(response, setState);
  return response;
}

async function readProfileOfUser(token, setState) {
  const method = "GET";
  const urlExtension = "/profile";

  const response = await getJsonResponse(urlExtension, method, token);

  if (response.error) {
    return response.data;
  }

  createProfileLocalStorage(response, setState);
  return response;
}

async function readProfile(profileId, token, setState) {
  const method = "GET";
  const urlExtension = `/profile/${profileId} `;

  const response = await getJsonResponse(urlExtension, method, token);

  if (response.error) {
    return response.data;
  }

  if (setState) {
    setState(response);
  }

  return response;
}

// post functions
async function createPost(text, token, profileId, setProfile) {
  const method = "POST";
  const urlExtension = `/post/${profileId}`;
  const bodyObject = { text };

  const response = await getJsonResponse(
    urlExtension,
    method,
    token,
    bodyObject
  );

  if (response.error) {
    return response.data;
  }

  const profileResponse = await readProfileOfUser(token, setProfile);

  if (profileResponse.errors) {
    return profileResponse.errors;
  }

  return response;
}

async function readRecentPosts(token, startNumber) {
  const method = "GET";
  const urlExtension = `/post/recent/${startNumber}`;

  const response = await getJsonResponse(urlExtension, method, token, null);

  if (response.error) {
    return response.data;
  }

  return response;
}

// comment functions
async function createComment(token, parentId, profileId, text, parentIsPost) {
  const method = "POST";
  const urlExtension = parentIsPost
    ? `/comment/post/${parentId}/from/${profileId}`
    : `/comment/reply/${parentId}/from/${profileId}`;
  const bodyObject = { text };

  const response = await getJsonResponse(
    urlExtension,
    method,
    token,
    bodyObject
  );

  if (response.error) {
    return response.data;
  }

  return response;
}

async function readComments(token, parentId, parentIsPost) {
  const method = "GET";
  const urlExtension = parentIsPost
    ? `/comment/post/${parentId}`
    : `/comment/reply/${parentId}`;

  const response = await getJsonResponse(urlExtension, method, token, null);

  if (response.error) {
    return response.data;
  }

  return response;
}

// like functions
async function createLike(token, parentId, profileId, parentIsPost) {
  const method = "POST";
  const urlExtension = parentIsPost
    ? `/like/post/${parentId}/from/${profileId}`
    : `/like/comment/${parentId}/from/${profileId}`;

  const response = await getJsonResponse(urlExtension, method, token);

  if (response.error) {
    return response.data;
  }

  return response;
}

async function deleteLike(token, likeId) {
  const method = "DELETE";
  const urlExtension = `/like/${likeId} `;

  const response = await getJsonResponse(urlExtension, method, token);

  if (response.error) {
    return response.data;
  }

  return response;
}

export {
  // comment functions
  createComment,
  readComments,

  // like functions
  createLike,
  deleteLike,

  // post functions
  createPost,
  readRecentPosts,

  // profile functions
  createProfile,
  readProfile,
  readProfileOfUser,

  // user functions
  logUserIn,
  signupUser,
};
