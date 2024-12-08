import jwt from "jsonwebtoken";
import sendResponse from "../utility/utility.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return sendResponse(res, 401, "Access Denied");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const isTokenExpired = err.name === "TokenExpiredError";
      if (isTokenExpired) {
        return sendResponse(res, 403, "Token Expired");
      } else {
        return sendResponse(res, 401, "Invalid Token");
      }
    }
    req.user = decoded;
    next();
  });
};

export default authenticateToken;
