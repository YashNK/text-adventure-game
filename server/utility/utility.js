const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  messageCode = 1,
  errorMessage = null
) => {
  return res.status(statusCode).json({
    message,
    data,
    isSuccess: statusCode >= 200 && statusCode < 300,
    messageCode,
    errorMessage,
  });
};

export default sendResponse;
