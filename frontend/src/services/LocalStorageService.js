import jwt_decode from "jwt-decode";

const setToken = (token) => {
    localStorage.setItem("ACCESS_TOKEN", token);
}

const getToken = () => {
    return localStorage.getItem("ACCESS_TOKEN")
}

const removeToken = () => {
    localStorage.clear();
}

const getRole = () => {
    if (getToken()) {
        return "USER";
    }
    return "GUEST";
}
const getUserProfile = () => {
    let token = getToken();
    if (token) {
        return jwt_decode(token)
    }
    return { id: null }
}

export default {
    getToken,
    setToken,
    removeToken,
    getRole,
    getUserProfile
};