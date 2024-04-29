import React from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { loginUserState } from "../../../../store/atoms/userAtom";
import { PasswordChangeModal } from "../PasswordChangeModal";

// userEventの設定
const user = userEvent.setup();

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
const setErrorsMock = jest.fn();
const setIsLoadingMock = jest.fn();
const setUploadProfileProgressMock = jest.fn();

let currentPasswordInput: HTMLInputElement;
let newPasswordInput: HTMLInputElement;
let newPasswordConfirmationInput: HTMLInputElement;
let button: HTMLInputElement;

afterEach(() => {
  jest.clearAllMocks();
});

const fillForm = async (
  currentPassword = "",
  newPassword = "",
  newPasswordConfirmation = ""
) => {
  currentPasswordInput = screen.getByLabelText("現在のパスワード");
  newPasswordInput = screen.getByLabelText("新しいパスワード");
  newPasswordConfirmationInput =
    screen.getByLabelText("新しいパスワード(確認)");
  button = screen.getByRole("button", { name: "変更する" });

  if (currentPassword) await user.type(currentPasswordInput, currentPassword);
  if (newPassword) await user.type(newPasswordInput, newPassword);
  if (newPasswordConfirmation)
    await user.type(newPasswordConfirmationInput, newPasswordConfirmation);
};

describe("失敗する場合", () => {
  it("現在のパスワードが6文字未満の場合、エラーメッセージが表示される", async () => {
    render(
      <>
        <RecoilRoot initializeState={initializeState}>
          <PasswordChangeModal
            setErrors={setErrorsMock}
            setIsLoading={setIsLoadingMock}
            setUploadProfileProgress={setUploadProfileProgressMock}
            passwordChangeOpen={true}
            handleModalClose={() => {}}
          />
        </RecoilRoot>
      </>
    );
    await fillForm("12345", "234567", "234567");
    await userEvent.click(button);

    const errorMessage = await screen.findByText(
      "現在のパスワードは6文字以上である必要があります。"
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("新しいパスワードが6文字未満の場合、エラーメッセージが表示される", async () => {
    render(
      <>
        <RecoilRoot initializeState={initializeState}>
          <PasswordChangeModal
            setErrors={setErrorsMock}
            setIsLoading={setIsLoadingMock}
            setUploadProfileProgress={setUploadProfileProgressMock}
            passwordChangeOpen={true}
            handleModalClose={() => {}}
          />
        </RecoilRoot>
      </>
    );
    await fillForm("123456", "23456", "234567");
    await userEvent.click(button);

    const errorMessage = await screen.findByText(
      "新しいパスワードは6文字以上である必要があります。"
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("現在のパスワードと新しいパスワードが同じ場合、エラーメッセージが表示される", async () => {
    render(
      <>
        <RecoilRoot initializeState={initializeState}>
          <PasswordChangeModal
            setErrors={setErrorsMock}
            setIsLoading={setIsLoadingMock}
            setUploadProfileProgress={setUploadProfileProgressMock}
            passwordChangeOpen={true}
            handleModalClose={() => {}}
          />
        </RecoilRoot>
      </>
    );
    await fillForm("123456", "123456", "123456");
    await userEvent.click(button);

    const errorMessage = await screen.findByText(
      "現在のパスワードと新しいパスワードが同じです。"
    );
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
  it("新しいパスワードと新しいパスワード(確認)が異なる場合、エラーメッセージが表示される", async () => {
    render(
      <>
        <RecoilRoot initializeState={initializeState}>
          <PasswordChangeModal
            setErrors={setErrorsMock}
            setIsLoading={setIsLoadingMock}
            setUploadProfileProgress={setUploadProfileProgressMock}
            passwordChangeOpen={true}
            handleModalClose={() => {}}
          />
        </RecoilRoot>
      </>
    );
    await fillForm("123456", "234567", "345678");
    await userEvent.click(button);

    const errorMessage = await screen.findByText("パスワードが一致しません。");
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
