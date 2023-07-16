import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { UploadView } from "../../src/components/pages/UploadView";
import { UserContext } from "../providers/UserProvider";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

jest.mock("../../src/urls/index", () => ({
  createPosts: jest.fn().mockResolvedValue({ data: {} }),
  getPosts: jest.fn(),
}));

const history = createMemoryHistory();

const setup = (loggedInStatus) => {
  return render(
    <MemoryRouter>
      <UserContext.Provider value={{ loggedInStatus }}>
        <UploadView />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

//単体テスト
describe("Unit Test for UploadView component", () => {
  it("レンダリングされるか", () => {
    setup(true);
    //アップロードボタンがあるか
    expect(screen.getByText("アップロード")).toBeInTheDocument();
    //アップロードしてくださいのテキストがあるか
    expect(
      screen.getByText("写真をアップロードしてください")
    ).toBeInTheDocument();
    //投稿するボタンがあるか
    expect(screen.getByRole("button", { name: "投稿する" })).toBeDisabled();
  });
});
