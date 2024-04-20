import React from "react";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/navigation";
import { Login } from "../Login";
import { setupMockServer } from "../../../_utils/test-helpers";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { handleLogin } from "./msw";

// userEventの設定
const user = userEvent.setup();

// useRouterのモック化
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

// mock serverの設定
setupMockServer(handleLogin());

// setup
let emailInput: HTMLInputElement;
let passwordInput: HTMLInputElement;
let button: HTMLInputElement;

beforeEach(() => {
  render(
    <>
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    </>
  );
  emailInput = screen.getByRole("textbox", {
    name: "メールアドレス",
  });
  passwordInput = screen.getByPlaceholderText("パスワードを入力してください");
  button = screen.getByRole("button", { name: "ログイン" });
});
afterEach(() => {
  jest.clearAllMocks();
});

const fillForm = async (email = "", password = "") => {
  if (email) await user.type(emailInput, email);
  if (password) await user.type(passwordInput, password);
};

// テスト
describe("成功する場合", () => {
  test("存在するメールアドレス、パスワードでログインした場合、成功する", async () => {
    await fillForm("Ares@example.com", "111111");
    userEvent.click(button);

    await waitFor(() => {
      expect(useRouter().push).toBeCalledTimes(1);
    });
  });
});

describe("失敗する場合", () => {
  test("メールアドレスが未入力の場合、エラーが表示される", async () => {
    await fillForm("", "111111");
    userEvent.click(button);

    const errorMessage = await screen.findByText(
      "メールアドレスを入力してください"
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
      expect(useRouter().push).toBeCalledTimes(0);
    });
  });

  test("パスワードが未入力の場合、エラーが表示される", async () => {
    await fillForm("Ares@example.com", "");
    userEvent.click(button);

    const errorMessage = await screen.findByText(
      "パスワードを入力してください"
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
      expect(useRouter().push).toBeCalledTimes(0);
    });
  });

  test("存在しないメールアドレス、パスワードの場合、エラーが表示される", async () => {
    await fillForm("401@example.com", "111111");
    userEvent.click(button);

    const errorMessage1 = await screen.findByText("ログインに失敗しました。");
    const errorMessage2 = await screen.findByText(
      "入力した情報を確認して再度お試しください。"
    );
    await waitFor(() => {
      expect(errorMessage1).toBeInTheDocument();
      expect(errorMessage2).toBeInTheDocument();
      expect(useRouter().push).toBeCalledTimes(0);
    });
  });
});
