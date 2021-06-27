
// remove the token and user from the session storage
export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('started');
}

// set the token and user from the session storage
export const setUserSession = (data) => {
    let token = data.accessToken;
    let user = data.user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () => {
    if (localStorage.getItem('token')) {
        return localStorage.getItem('token');
    }
    return null;
}