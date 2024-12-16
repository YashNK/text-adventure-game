const BASE = process.env.REACT_APP_BASE_URL;

export const apiRoutes = {
  BASE,
  USER: `${BASE}/user`,
  STORY: `${BASE}/story`,
  CHARACTER: `${BASE}/character`,
  CHAPTER: `${BASE}/chapter`,
  LEVEL: `${BASE}/level`,
  USER_STORY: `${BASE}/user-story`,
};
