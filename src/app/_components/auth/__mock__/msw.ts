import { rest } from "msw";

type RegistrationBody = {
  user: {
    email: string;
    nickname: string;
    password: string;
    password_confirmation: string;
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

