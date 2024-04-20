import { rest } from "msw";

type RegistrationBody = {
  user: {
    email: string;
    nickname: string;
    password: string;
    password_confirmation: string;
  };
};

type LoginBody = {
  session: {
    email?: string;
    password: string;
  };
};

// 新規登録処理のモック
export const handleRegistration = () => {
  return rest.post("/api/v1/users", async (req, res, ctx) => {
    const body: RegistrationBody = await req.json();
    // 失敗時
    if (body.user.email === "422@example.com") {
      return res(
        ctx.status(422),
        ctx.json({
          errors: ["同じメールアドレスがすでに使用されています"],
        })
      );
    }
    // 成功時
    return res(
      ctx.json({
        registered: true,
        user: {
          id: 1,
          nickname: "Ares",
          email: "Ares@example.com",
          avatar: "https://example.com/avatar.jpg",
          following: [],
        },
      })
    );
  });
};

// ログイン処理のモック
export const handleLogin = () => {
  return rest.post("/api/v1/login", async (req, res, ctx) => {
    const body: LoginBody = await req.json();
    // 失敗時
    if (body.session.email === "401@example.com") {
      return res(
        ctx.status(401),
        ctx.json({
          errors: [
            "ログインに失敗しました。",
            "入力した情報を確認して再度お試しください。",
          ],
        })
      );
    }
    // 成功時
    return res(
      ctx.json({
        loggedIn: true,
        user: { id: 1, nickname: "Ares", email: "Ares@example.com" },
      })
    );
  });
};
