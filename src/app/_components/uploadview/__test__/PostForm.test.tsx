import React from "react";
import { RecoilRoot } from "recoil";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PostForm } from "../PostForm";

// モック関数
const handleGetImagesMock = jest.fn();
global.URL.createObjectURL = jest.fn();

// useRouterのモック化
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("失敗する場合(バリデーション)", () => {
  it("投稿ボタンは画像が選択されていないとき非有効化される", () => {
    render(
      <>
        <RecoilRoot>
          <PostForm handleGetImages={handleGetImagesMock} />
        </RecoilRoot>
      </>
    );
    expect(screen.getByRole("button", { name: "投稿する" })).toBeDisabled();
  });

  it("画像を選択すると投稿ボタンが有効化される", () => {
    render(
      <>
        <RecoilRoot>
          <PostForm handleGetImages={handleGetImagesMock} />
        </RecoilRoot>
      </>
    );
    const fileInput = screen.getByLabelText(/アップロード/);
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByRole("button", { name: "投稿する" })).toBeEnabled();
  });

  it("11枚以上のファイルをアップロードしようとするとエラーが表示され、ボタンは非活性のまま", () => {
    render(
      <>
        <RecoilRoot>
          <PostForm handleGetImages={handleGetImagesMock} />
        </RecoilRoot>
      </>
    );
    const fileInput = screen.getByLabelText(/アップロード/);
    const files = new Array(11)
      .fill(null)
      .map(
        (_, i) =>
          new File(["(⌐□_□)"], `chucknorris${i}.png`, { type: "image/png" })
      );
    fireEvent.change(fileInput, { target: { files } });

    expect(
      screen.getByText(/一度に投稿できるのは、10枚までです/)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "投稿する" })).toBeDisabled();
  });
});
