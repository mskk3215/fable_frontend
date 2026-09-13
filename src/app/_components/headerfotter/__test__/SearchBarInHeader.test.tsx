import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import { SearchBarInHeader } from "../SearchBarInHeader";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/"),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("../../../../hooks/useAllInsects", () => ({
  useAllInsects: jest.fn().mockReturnValue({
    insectOptions: [],
    setQueryWord: jest.fn(),
  }),
}));

jest.mock("../../../../hooks/useParks", () => ({
  useParks: jest.fn().mockReturnValue({
    handleGetParkSearchResults: jest.fn(),
  }),
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe("SearchBarInHeader", () => {
  it("MUI専用のpropsをDOMへ渡さず検索欄を表示する", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    render(
      <RecoilRoot>
        <SearchBarInHeader />
      </RecoilRoot>
    );

    expect(screen.getByPlaceholderText("昆虫名を入力")).toBeInTheDocument();
    expect(consoleError.mock.calls.flat().join(" ")).not.toContain(
      "React does not recognize"
    );
  });
});
