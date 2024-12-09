const BASE = process.env.REACT_APP_BASE_URL;

export const apiRoutes = {
  BASE,
  LOGIN: `${BASE}/user/login`,
  REGISTER: `${BASE}/user/register`,
  CURRENT_USER: `${BASE}/user/current-user`,
  STORY: `${BASE}/story/stories`,
  CHARACTERS: `${BASE}/character`,
  SET_USER_CHARACTER: `${BASE}/user/user-character`,
};
