export function setUserStore(user) {
  if (!user) return;
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserStore() {
  try {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function setTokenStore(token) {
  if (!token) return;
  localStorage.setItem("token", token);
}

export function getTokenStore() {
  try {
    const token = localStorage.getItem("token");
    return token || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function clearUserStore() {
  localStorage.removeItem("user");
}

export function clearAllStore() {
  localStorage.clear();
}
