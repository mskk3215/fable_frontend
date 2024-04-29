import { useEffect } from "react";
import { apiClient } from "../../urls";

export const useGetRequestErrorAction = () => {
  // リクエストのエラーハンドリング
  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          let errorMessage = "";
          if (error.response.data.error) {
            errorMessage = error.response.data.error;
          } else {
            switch (error.response.status) {
              case 400:
                errorMessage =
                  "無効なリクエストです。入力情報を確認してください。";
                break;
              case 401:
                errorMessage =
                  "ログインに失敗しました。入力した情報を確認して再度お試しください。";
                break;
              case 403:
                errorMessage =
                  "アクセスが拒否されました。権限を確認してください。";
                break;
              case 404:
                errorMessage = "ページまたはリソースが見つかりませんでした。";
                break;
              case 500:
                errorMessage =
                  "サーバーエラーが発生しました。時間をおいて再度お試しください。";
                break;
              default:
                errorMessage = "不明なエラーが発生しました。";
            }
          }
          error.errorMessage = errorMessage;
        } else if (error.request) {
          // リクエストが送信されなかった場合のエラーメッセージを設定
          error.errorMessage =
            "サーバーに接続できませんでした。ネットワークを確認してください。";
        } else {
          // その他のエラーの場合のエラーメッセージを設定
          error.errorMessage =
            "エラーが発生しました。時間をおいて再度お試しください。";
        }
        return Promise.reject(error);
      }
    );
    // クリーンアップ関数
    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, []);
};
