import { isAxiosError } from "axios";

export const handleApiError = (error: unknown) => {
  if (isAxiosError(error)) {
    if (error.response?.data.message) {
      return error.response?.data.message;
    } else {
      return error.message;
    }
  } else {
    return "Unexpected Error";
  }
};
