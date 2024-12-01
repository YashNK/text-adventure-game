const BASE_URL = "http://localhost:5000/api";

export const apiRoutes = {
  BASE_URL,
  LOGIN: `${BASE_URL}/users/login`,
  REGISTER: `${BASE_URL}/users/register`,
  STORY: `${BASE_URL}/story`,
};
