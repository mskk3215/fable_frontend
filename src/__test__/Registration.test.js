import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Registration } from "../components/pages/auth/Registration";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

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
