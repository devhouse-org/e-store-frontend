export const isAuthenticated = () => {
    const sessionId = localStorage.getItem("session_id");
    return !!sessionId;
};

export const logout = () => {
    localStorage.removeItem("session_id");
    window.location.href = "/login";
}; 