import React from "react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Registration } from "../components/pages/auth/Registration";

//単体テスト
describe("Unit Test Registration component", () => {
  it("名前入力欄があるか", async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const textbox = screen.getByRole("textbox", { name: "名前" });
    const value = "tarou";
    userEvent.type(textbox, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
  it("メールアドレス入力欄があるか", async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const textbox = screen.getByRole("textbox", { name: "メールアドレス" });
    const value = "test@test.com";
    userEvent.type(textbox, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
  it("パスワード入力欄があるか", async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const password =
      screen.getByPlaceholderText("パスワードを入力してください");
    const value = "password123";
    userEvent.type(password, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
  it("確認用パスワード入力欄があるか", async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const password =
      screen.getByPlaceholderText("パスワードを再入力してください");
    const value = "password123";
    userEvent.type(password, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
});

//統合テスト
jest.mock("axios");
describe("Integration Test Registration component", () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  //成功する場合
  it("全ての項目が入力されていて登録ボタンをクリックすれば、フォーム送信処理が成功する", async () => {
    axios.post.mockResolvedValue({ data: { status: "created" } }); //axios.postの返り値をモック化
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );

    const formData = {
      nickname: "jiro",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "password123",
    };
    const nameInput = screen.getByRole("textbox", { name: "名前" });
    const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });
    const passwordInput =
      screen.getByPlaceholderText("パスワードを入力してください");
    const passwordConfirmationInput =
      screen.getByPlaceholderText("パスワードを再入力してください");
    const registrationButton = screen.getByRole("button", { name: "登録" });

    userEvent.type(nameInput, formData.nickname);
    userEvent.type(emailInput, formData.email);
    userEvent.type(passwordInput, formData.password);
    userEvent.type(passwordConfirmationInput, formData.password_confirmation);
    fireEvent.click(registrationButton);

    expect(axios.post).toHaveBeenCalledTimes(1); //axios.postが1回呼ばれているか
    expect(axios.post).toHaveBeenCalledWith("/api/v1/signup", formData, {
      withCredentials: true,
    });
  });
  it("ログインボタンをクリックすれば、ログインページに遷移する", async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const loginButton = screen.getByRole("button", { name: "ログイン" });
    fireEvent.click(loginButton);
    expect(screen.getByText("ログイン")).toBeInTheDocument();
  });

  //失敗する場合
  it("名前が入力されていなければ、エラーメッセージが出る", async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );

    const formData = {
      nickname: "jiro",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "password123",
    };
    const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });
    const passwordInput =
      screen.getByPlaceholderText("パスワードを入力してください");
    const passwordConfirmationInput =
      screen.getByPlaceholderText("パスワードを再入力してください");
    const registrationButton = screen.getByRole("button", { name: "登録" });

    userEvent.type(emailInput, formData.email);
    userEvent.type(passwordInput, formData.password);
    userEvent.type(passwordConfirmationInput, formData.password_confirmation);

    fireEvent.click(registrationButton);
    const errorMessage = screen.queryByText("入力されていない項目があります");
    expect(errorMessage).toBeInTheDocument();
  });

  it("メールアドレスが入力されていなければ、エラーメッセージが出る", async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const formData = {
      nickname: "jiro",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "password123",
    };

    const nameInput = screen.getByRole("textbox", { name: "名前" });
    const passwordInput =
      screen.getByPlaceholderText("パスワードを入力してください");
    const passwordConfirmationInput =
      screen.getByPlaceholderText("パスワードを再入力してください");
    const registrationButton = screen.getByRole("button", { name: "登録" });

    userEvent.type(nameInput, formData.nickname);
    userEvent.type(passwordInput, formData.password);
    userEvent.type(passwordConfirmationInput, formData.password_confirmation);

    fireEvent.click(registrationButton);
    const errorMessage = screen.queryByText("入力されていない項目があります");
    expect(errorMessage).toBeInTheDocument();
  });
  it("パスワードが入力されていなければ、エラーメッセージが出る", async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const formData = {
      nickname: "jiro",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "password123",
    };

    const nameInput = screen.getByRole("textbox", { name: "名前" });
    const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });

    const passwordConfirmationInput =
      screen.getByPlaceholderText("パスワードを再入力してください");
    const registrationButton = screen.getByRole("button", { name: "登録" });

    userEvent.type(nameInput, formData.nickname);
    userEvent.type(emailInput, formData.email);
    userEvent.type(passwordConfirmationInput, formData.password_confirmation);

    fireEvent.click(registrationButton);
    const errorMessage = screen.queryByText("入力されていない項目があります");
    expect(errorMessage).toBeInTheDocument();
  });
  it("確認用パスワードが入力されていなければ、エラーメッセージが出る", async () => {
    render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
    const formData = {
      nickname: "jiro",
      email: "test@example.com",
      password: "password123",
      password_confirmation: "password123",
    };

    const nameInput = screen.getByRole("textbox", { name: "名前" });
    const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });

    const passwordInput =
      screen.getByPlaceholderText("パスワードを入力してください");
    const registrationButton = screen.getByRole("button", { name: "登録" });

    userEvent.type(nameInput, formData.nickname);
    userEvent.type(emailInput, formData.email);
    userEvent.type(passwordInput, formData.password);

    fireEvent.click(registrationButton);
    const errorMessage = screen.queryByText("入力されていない項目があります");
    expect(errorMessage).toBeInTheDocument();
  });
});
