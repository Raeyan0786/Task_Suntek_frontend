export const TOKEN_KEY = 'tt_auth_token'
const USER_KEY="user"
export const setLocalStorage = (key:string,t: string) => localStorage.setItem(key, t)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export const getUser = () => localStorage.getItem(USER_KEY)
export const clearUser = () => localStorage.removeItem(USER_KEY)
