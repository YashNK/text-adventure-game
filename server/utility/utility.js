const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  showMessage = 1,
  errorMessage = null
) => {
  return res.status(statusCode).json({
    message,
    data,
    isSuccess: statusCode >= 200 && statusCode < 300,
    showMessage,
    errorMessage,
  });
};

export default sendResponse;
