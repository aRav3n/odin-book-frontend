// internal use functions
function createLocalStorage(key, object, setState) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(object));
  }
  setState(object);
}
function readLocalStorage(key, setState) {
  const item = JSON.parse(localStorage.getItem(key)) || null;
  if (item) {
    setState(item);
  }
}
function updateLocalStorage(key, newObject, setState) {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(newObject));
    setState(newObject);
  }
}
function deleteLocalStorage(key, setState) {
  localStorage.removeItem(key);
  setState(null);
}

// user functions
const userKey = "userObject";
export function createUserLocalStorage(userObject, setState) {
  createLocalStorage(userKey, userObject, setState);
}
export function readUserLocalStorage(setState) {
  readLocalStorage(userKey, setState);
}
export function updateUserLocalStorage(newUserObject, setState) {
  updateLocalStorage(userKey, newUserObject, setState);
}
export function deleteUserLocalStorage(setState) {
  deleteLocalStorage(userKey, setState);
}

// profile functions
const profileKey = "profileObject";
export function createProfileLocalStorage(profileObject, setState) {
  createLocalStorage(profileKey, profileObject, setState);
}
export function readProfileLocalStorage(setState) {
  readLocalStorage(profileKey, setState);
}
export function updateProfileLocalStorage(newProfileObject, setState) {
  updateLocalStorage(profileKey, newProfileObject, setState);
}
export function deleteProfileLocalStorage(setState) {
  deleteLocalStorage(profileKey, setState);
}
