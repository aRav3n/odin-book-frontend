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

// post functions
async function createPost(text, token, profileId) {
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
async function createCommentOnPost(token, postId, profileId, text) {
  const method = "POST";
  const urlExtension = `/comment/post/${postId}/from/${profileId} `;
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

export {
  // user functions
  logUserIn,
  signupUser,

  // profile functions
  createProfile,
  readProfileOfUser,

  // post functions
  createPost,
  readRecentPosts,

  // comment functions
  createCommentOnPost,
};
