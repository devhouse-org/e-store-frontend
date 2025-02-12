export const isAuthenticated = () => {
    const sessionId = localStorage.getItem("session_id");
    return !!sessionId;
};

export const logout = () => {
    localStorage.removeItem("session_id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href = "/login";
}; 