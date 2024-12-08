export const createNewPath = (path, params) => {
  let replacedPath = path;
  Object.keys(params).forEach((key) => {
    replacedPath = replacedPath.replace(`:${key}`, params[key]);
  });
  return replacedPath;
};
