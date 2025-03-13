export const isAuthenticated = () => {
  const sessionId = localStorage.getItem("session_id");
  return !!sessionId;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
