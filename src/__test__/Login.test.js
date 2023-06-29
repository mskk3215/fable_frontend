import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Login } from "../components/pages/auth/Login";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";

//単体テスト
describe("Unit test Login component", () => {
  it("メールアドレス入力欄があるか", async () => {
    render(
      <MemoryRouter>
        <Login />
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
        <Login />
      </MemoryRouter>
    );
    const password =
      screen.getByPlaceholderText("パスワードを入力してください");
    const value = "password123";
    userEvent.type(password, value);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
});

//統合テスト
jest.mock("axios");
describe("Integration Test Login component", () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  //成功する場合
  it("全ての項目が入力されていて登録ボタンをクリックすれば、フォーム送信処理が成功する", async () => {
    axios.post.mockResolvedValue({ data: { logged_in: true } }); //axios.postの返り値をモック化
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const formData = {
      email: "test@example.com",
      password: "password123",
    };
    const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });
    const passwordInput =
      screen.getByPlaceholderText("パスワードを入力してください");
    const loginButton = screen.getByRole("button", { name: "ログイン" });

    userEvent.type(emailInput, formData.email);
    userEvent.type(passwordInput, formData.password);
    fireEvent.click(loginButton);

    expect(axios.post).toHaveBeenCalledTimes(1); //axios.postが1回呼ばれているか
    expect(axios.post).toHaveBeenCalledWith("/api/v1/login", formData, {
      withCredentials: true,
    });
  });

  //失敗する場合
  it("メールアドレスが入力されていなければ、エラーメッセージが出る", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const formData = {
      email: "test@example.com",
      password: "password123",
    };
    const passwordInput =
      screen.getByPlaceholderText("パスワードを入力してください");
    const loginButton = screen.getByRole("button", { name: "ログイン" });

    userEvent.type(passwordInput, formData.password);
    fireEvent.click(loginButton);

    const errorMessage = screen.queryByText("入力されていない項目があります");
    expect(errorMessage).toBeInTheDocument();
  });

  it("パスワードが入力されていなければ、エラーメッセージが出る", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const formData = {
      email: "test@example.com",
      password: "password123",
    };

    const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });
    const loginButton = screen.getByRole("button", { name: "ログイン" });

    userEvent.type(emailInput, formData.email);
    fireEvent.click(loginButton);

    const errorMessage = screen.queryByText("入力されていない項目があります");
    expect(errorMessage).toBeInTheDocument();
  });
});
