import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  getRequestErrorMessageState,
  getRequestErrorStatusState,
} from "../../store/atoms/errorAtom";
import { apiClient } from "../../urls";

export const useGetRequestErrorHandler = () => {
  const [getRequestErrorStatus, setGetRequestErrorStatus] = useRecoilState(
    getRequestErrorStatusState
  );
  const setGetRequestErrorMessage = useSetRecoilState(
    getRequestErrorMessageState
  );

  // Getリクエストのエラーハンドリング
  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.config.method === "get") {
          setGetRequestErrorStatus(error.response.status);
        }
        return Promise.reject(error);
      }
    );
    // クリーンアップ関数
    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, []);

  // エラーメッセージの表示
  useEffect(() => {
    if (getRequestErrorStatus) {
      let userMessage: string;
      switch (getRequestErrorStatus) {
        case 400:
          userMessage = "無効なリクエストです。入力情報を確認してください。";
          break;
        case 401:
          userMessage = "認証に失敗しました。再度ログインしてください。";
          break;
        case 403:
          userMessage = "アクセスが拒否されました。権限を確認してください。";
          break;
        case 404:
          userMessage = "ページまたはリソースが見つかりませんでした。";
          break;
        case 500:
          userMessage = "サーバーエラーが発生しました。";
          break;
        case 503:
          userMessage = "サービスが利用できません。後ほど再試行してください。";
          break;
        case 504:
          userMessage =
            "サーバーとの接続に問題が発生しました。しばらくしてから再試行してください。";
          break;
        default:
          userMessage = "不明なエラーが発生しました。";
      }
      setGetRequestErrorMessage(userMessage);
    }
  }, [getRequestErrorStatus]);
};
