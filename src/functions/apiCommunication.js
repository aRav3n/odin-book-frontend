async function getJsonResponse(urlExtension, method, bodyObject, token) {
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
async function userLogIn(email, password) {
  const bodyObject = { email, password };
  const method = "POST";
  const urlExtension = "/user/login";

  const response = await getJsonResponse(urlExtension, method, bodyObject);

  if (response.error) {
    return response.data;
  }

  return response;
}

async function userSignUp(email, password, confirmPassword) {
  const bodyObject = { email, password, confirmPassword };
  const method = "POST";
  const urlExtension = "/user";

  const response = await getJsonResponse(urlExtension, method, bodyObject);

  if (response.error) {
    return response.data;
  }

  return response;
}

export {
  // user functions
  userLogIn,
  userSignUp,
};
