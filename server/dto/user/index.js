export const LoginResponse = (token, user) => {
  return {
    userId: user.userId,
    username: user.username,
    token,
  };
};

export const CurrentUserResponse = (user) => {
  return {
    userId: user.userId,
    username: user.username,
    isNewUser: user.isNewUser,
  };
};
