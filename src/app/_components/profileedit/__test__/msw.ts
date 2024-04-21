import { rest } from "msw";

// Profile変更処理のモック
export const handleProfileEdit = () => {
  return rest.put(`/api/v1/users/:id/profile`, async (req, res, ctx) => {
    const { id } = req.params;

    // 成功時
    return res(
      ctx.json({
        updated: true,
        user: {
          id: id,
          nickname: "Blaze",
          email: "Blaze@example.com",
          avatar: null,
          following: [],
        },
      })
    );
  });
};
