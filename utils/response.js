export const successResponse = (
  message,
  data = null
) => {
  return {
    status: "success",
    message,
    data,
  };
};

export const errorResponse = (
  message,
  code = null
) => {
  return {
    status: "error",
    message,
    code,
  };
};