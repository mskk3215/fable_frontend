import React from "react";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/navigation";
import { Registration } from "../Registration";
import { setupMockServer } from "../../../_utils/test-helpers";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { handleRegistration } from "../__mock__/msw";

// userEventの設定
const user = userEvent.setup();

// useRouterのモック化
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

// mock serverの設定
setupMockServer(handleRegistration());

// setup
let nameInput: HTMLInputElement;
let emailInput: HTMLInputElement;
let passwordInput: HTMLInputElement;
let passwordConfirmationInput: HTMLInputElement;
let button: HTMLInputElement;

beforeEach(() => {
  render(
    <>
      <RecoilRoot>
        <Registration />
      </RecoilRoot>
    </>
  );
  nameInput = screen.getByRole("textbox", {
    name: "名前",
  });
  emailInput = screen.getByRole("textbox", {
    name: "メールアドレス",
  });
  passwordInput = screen.getByPlaceholderText("パスワードを入力してください");
  passwordConfirmationInput =
    screen.getByPlaceholderText("パスワードを再入力してください");
  button = screen.getByRole("button", { name: "登録" });
});
afterEach(() => {
  jest.clearAllMocks();
});

const fillForm = async (
  name = "",
  email = "",
  password = "",
  confirmPassword = ""
) => {
  if (name) await user.type(nameInput, name);
  if (email) await user.type(emailInput, email);
  if (password) await user.type(passwordInput, password);
  if (confirmPassword)
    await user.type(passwordConfirmationInput, confirmPassword);
};

// テスト
describe("成功する場合", () => {
  it("全ての項目を正しく入力した場合、新規登録が成功する", async () => {
    await fillForm("Ares", "taro@example.com", "111111", "111111");
    userEvent.click(button);

    await waitFor(() => {
      expect(useRouter().push).toBeCalledTimes(1);
    });
  });
});

describe("失敗する場合", () => {
  it("名前が未入力の場合、エラーが表示される", async () => {
    await fillForm("", "taro@example.com", "111111", "111111");
    userEvent.click(button);

    const errorMessage = await screen.findByText("名前を入力してください");
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
      expect(useRouter().push).toBeCalledTimes(0);
    });
  });
  it("メールアドレスが未入力の場合、エラーが表示される", async () => {
    await fillForm("Ares", "", "111111", "111111");
    userEvent.click(button);

    const errorMessage = await screen.findByText(
      "メールアドレスを入力してください"
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
      expect(useRouter().push).toBeCalledTimes(0);
    });
  });
  it("パスワードが未入力の場合、エラーが表示される", async () => {
    await fillForm("Ares", "taro@example.com", "", "111111");
    userEvent.click(button);

    const errorMessage = await screen.findByText(
      "パスワードを入力してください"
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
      expect(useRouter().push).toBeCalledTimes(0);
    });
  });
  it("確認用パスワードが未入力の場合、エラーが表示される", async () => {
    await fillForm("Ares", "taro@example.com", "111111", "");
    userEvent.click(button);

    const errorMessage = await screen.findByText(
      "確認用パスワードを入力してください"
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
      expect(useRouter().push).toBeCalledTimes(0);
    });
  });
  it("パスワードと確認用パスワードが一致しない場合、エラーが表示される", async () => {
    await fillForm("Ares", "taro@example.com", "111111", "555555");
    userEvent.click(button);

    const errorMessage = await screen.findByText("パスワードが一致しません");
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
      expect(useRouter().push).toBeCalledTimes(0);
    });
  });
});
