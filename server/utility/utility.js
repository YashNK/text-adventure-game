const sendResponse = (res, statusCode, message, data = null, error = null) => {
  return res.status(statusCode).json({
    message,
    data,
    error,
    isSuccess: statusCode >= 200 && statusCode < 300,
  });
};

export default sendResponse;
