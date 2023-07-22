import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
// @ts-expect-error TS(6142): Module '../../src/components/pages/UploadView' was... Remove this comment to see the full error message
import { UploadView } from "../../src/components/pages/UploadView";
// @ts-expect-error TS(6142): Module '../providers/UserProvider' was resolved to... Remove this comment to see the full error message
import { UserContext } from "../providers/UserProvider";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

jest.mock("../../src/urls/index", () => ({
  createPosts: jest.fn().mockResolvedValue({ data: {} }),
  getPosts: jest.fn(),
}));

const history = createMemoryHistory();

const setup = (loggedInStatus: any) => {
  return render(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <MemoryRouter>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <UserContext.Provider value={{ loggedInStatus }}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
