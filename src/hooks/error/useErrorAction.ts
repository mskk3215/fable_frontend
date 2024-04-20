import { ApiError } from "../../types/api";

export const useErrorAction = () => {
  // 一般的なエラー処理(Toastへ表示)
  const handleGeneralErrorAction = (
    error: ApiError,
    setMessage: (msg: { message: string; type: string }) => void
  ) => {
    const errorMessage = Array.isArray(error.errorMessage)
      ? error.errorMessage.join("\n")
      : error.errorMessage;
    setMessage({
      message: errorMessage,
      type: "error",
    });
  };

  // 認証系のエラー処理(DOMへ表示)
  const handleAuthErrorAction = (
    error: ApiError,
    setErrors: (error: string[]) => void
  ) => {
    const errorsArray = Array.isArray(error.errorMessage)
      ? error.errorMessage
      : [error.errorMessage];
    setErrors(errorsArray);
  };
  return { handleGeneralErrorAction, handleAuthErrorAction };
};
