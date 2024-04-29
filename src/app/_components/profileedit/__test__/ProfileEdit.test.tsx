import React from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";
import { ProfileEdit } from "../ProfileEdit";
import { setupMockServer } from "../../../_utils/test-helpers";
import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { handleProfileEdit } from "./msw";
import { loginUserState } from "../../../../store/atoms/userAtom";

// userEventの設定
const user = userEvent.setup();

// useRouterのモック化
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

// mock serverの設定
setupMockServer(handleProfileEdit());

// ログインユーザー情報の設定
const initializeState = (snapshot: MutableSnapshot) => {
  snapshot.set(loginUserState, {
    id: 1,
    nickname: "Ares",
    email: "Ares@example.com",
    avatar: undefined,
    following: [],
  });
};

// setup
let nameInput: HTMLInputElement;
let emailInput: HTMLInputElement;
let button: HTMLInputElement;

afterEach(() => {
  jest.clearAllMocks();
});

describe("失敗する場合", () => {
  it("名前が空白の場合、エラーメッセージが表示される", async () => {
    render(
      <>
        <RecoilRoot initializeState={initializeState}>
          <ProfileEdit />
        </RecoilRoot>
      </>
    );
    nameInput = screen.getByRole("textbox", {
      name: "名前",
    });
    emailInput = screen.getByRole("textbox", {
      name: "メールアドレス",
    });
    button = screen.getByRole("button", { name: "更新する" });

    await user.clear(nameInput);
    await userEvent.click(button);

    const errorMessage = await screen.findByText("名前を入力してください");
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
  it("メールアドレスが空白の場合、エラーメッセージが表示される", async () => {
    render(
      <>
        <RecoilRoot initializeState={initializeState}>
          <ProfileEdit />
        </RecoilRoot>
      </>
    );
    nameInput = screen.getByRole("textbox", {
      name: "名前",
    });
    emailInput = screen.getByRole("textbox", {
      name: "メールアドレス",
    });
    button = screen.getByRole("button", { name: "更新する" });

    await user.clear(emailInput);
    await userEvent.click(button);

    const errorMessage = await screen.findByText(
      "メールアドレスを入力してください"
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
