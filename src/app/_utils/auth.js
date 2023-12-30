export const handleLogin = async (
  email,
  password,
  setErrors,
  setIsLoading,
  handleLoginAction
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
