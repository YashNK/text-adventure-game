const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  messageCode = 1
) => {
  return res.status(statusCode).json({
    message,
    data,
    isSuccess: statusCode >= 200 && statusCode < 300,
    messageCode,
  });
};

export default sendResponse;
