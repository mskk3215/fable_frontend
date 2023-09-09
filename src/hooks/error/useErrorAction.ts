import { ApiError } from "../../types/api";

export const useErrorAction = () => {
  // 一般的なエラー処理
  const handleGeneralErrorAction = (
    error: ApiError,
    setMessage: (message: string) => void
  ) => {
    if (!error.response || error.response.status >= 500) {
      setMessage(
        "ネットワークエラーが発生しました。しばらくしてから再試行してください。"
      );
    } else {
      setMessage(error.response.data.error_messages);
    }
  };

