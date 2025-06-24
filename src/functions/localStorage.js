// user functions
export function createLocalStorageForUser(userObject) {
  console.log({ userObject });
  if (!localStorage.getItem("userObject")) {
    console.log("not in local storage yet");
    localStorage.setItem("userObject", JSON.stringify(userObject));
    return;
  }
}

export function readLocalStorageForUser() {
  return JSON.parse(localStorage.getItem("userObject")) || null;
}

export function updateLocalStorageForUser(newUserObject) {
  if (localStorage.getItem("userObject")) {
    localStorage.removeItem("userObject");
    localStorage.setItem("userObject", JSON.stringify(newUserObject));
    return;
  }
}

export function deleteLocalStorageForUser() {
  localStorage.removeItem("userObject");
}
