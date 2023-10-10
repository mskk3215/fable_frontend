import { ApiError } from "../../types/api";

export const useErrorAction = () => {
  // 一般的なエラー処理
  const handleGeneralErrorAction = (
    error: ApiError,
    setMessage: (msg: { message: string; type: string }) => void
  ) => {
    if (!error.response || error.response.status >= 500) {
      setMessage({
        message:
          "ネットワークエラーが発生しました。しばらくしてから再試行してください。",
        type: "error",
      });
    } else {
      setMessage({
        message: error.response.data.errorMessages,
        type: "error",
      });
    }
  };

  // 認証系のエラー処理
  const handleAuthErrorAction = (
    error: ApiError,
    setErrors?: (errors: string[]) => void
  ) => {
    if (!setErrors) return;

    if (!error.response || error.response.status >= 500) {
      setErrors([
        "ネットワークエラーが発生しました。しばらくしてから再試行してください。",
      ]);
    } else {
      setErrors(error.response.data.errors);
    }
  };
  return { handleGeneralErrorAction, handleAuthErrorAction };
};
