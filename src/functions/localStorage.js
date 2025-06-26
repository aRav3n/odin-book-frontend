// user functions
const localUserKey = "userObject";

export function createLocalStorageForUser(userObject) {
  if (!localStorage.getItem(localUserKey)) {
    localStorage.setItem(localUserKey, JSON.stringify(userObject));
    return;
  }
}

export function readLocalStorageForUser() {
  return JSON.parse(localStorage.getItem(localUserKey)) || null;
}

export function updateLocalStorageForUser(newUserObject) {
  if (localStorage.getItem(localUserKey)) {
    localStorage.removeItem(localUserKey);
    localStorage.setItem(localUserKey, JSON.stringify(newUserObject));
    return;
  }
}

export function deleteLocalStorageForUser() {
  localStorage.removeItem(localUserKey);
}

// profile functions
const localProfileKey = "profileObject";

export function createLocalProfileStorage(profileObject) {
  if (!localStorage.getItem(localProfileKey)) {
    localStorage.setItem(localProfileKey, JSON.stringify(profileObject));
    return true;
  }
}

export function readLocalProfileStorage() {
  return JSON.parse(localStorage.getItem(localProfileKey)) || null;
}

export function updateLocalProfileStorage(newProfileObject) {
  if (localStorage.getItem(localProfileKey)) {
    localStorage.removeItem(localProfileKey);
    localStorage.setItem(localProfileKey, JSON.stringify(newProfileObject));
    return;
  }
}

export function deleteLocalProfileStorage() {
  localStorage.removeItem(localProfileKey);
}
