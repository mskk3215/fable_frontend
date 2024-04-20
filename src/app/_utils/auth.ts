import { LoginAuthAction } from "../../types/user";

// loginコンポーネントのほかuserpageでも使用
export const handleLogin = async (
  email: string,
  password: string,
  setErrors: (errors: string[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  handleLoginAction: (action: LoginAuthAction) => void
) => {
  // バリデーション
  const inputFields = [
    {
      value: email,
      name: "メールアドレス",
    },
    {
      value: password,
      name: "パスワード",
    },
  ];
  const errorMessages = inputFields
    .filter((field) => !field.value)
    .map((field) => `${field.name}を入力してください`);
  if (errorMessages.length > 0) {
    setErrors(errorMessages);
    return;
  }

  // ログイン認証
  handleLoginAction({
    email: email,
    password: password,
    setErrors: setErrors,
    setIsLoading: setIsLoading,
  });
};
