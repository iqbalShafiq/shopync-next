export function setToken(token: string) {
  document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;
}

export function getToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}

export function removeToken() {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}