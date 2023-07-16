import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { Top } from "../components/pages/Top";
import {
  SearchParkContext,
  SearchParkProvider,
} from "../providers/SearchParkProvider";
import { rest } from "msw";
import { setupServer } from "msw/node";

//mockServerの設定
const mockServer = setupServer(
  rest.get("/api/v1/insects", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "アオタテハモドキ",
        availableSexes: ["オス", "メス"],
      })
    );
  }),
  rest.get("/api/v1/parks", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: "高尾山",
        post_code: "193-0844",
        address: "東京都八王子市高尾町",
        latitude: 35.6254,
        longitude: 139.244,
        prefecture_name: "東京都",
        city_name: "八王子市",
        image: [
          "http://localhost:3001/uploads/image/image/3/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2023-02-06_23.23.05.png",
          "http://localhost:3001/uploads/image/image/4/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2023-02-06_23.23.58.png",
          "http://localhost:3001/uploads/image/image/7/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2023-05-20_0.19.15.png",
        ],
        image_count: 3,
        insect_count: 3,
      })
    );
  })
);

//単体テスト
describe("Unit test for Top component", () => {
  //mockServer起動と終了
  beforeAll(() => {
    mockServer.listen();
  });
  afterAll(() => {
    mockServer.close();
  });

  it("レンダリングされるか", () => {
    render(
      <RecoilRoot>
        <MemoryRouter>
          <SearchParkProvider>
            <Top />
          </SearchParkProvider>
        </MemoryRouter>
      </RecoilRoot>
    );
    //検索窓があるか
    const searchInput = screen.getByPlaceholderText("昆虫名を入力して下さい");
    expect(searchInput).toBeInTheDocument();
    //検索ボタンがあるか
    expect(screen.getByRole("button", { name: "検索" })).toBeDisabled();
  });

  it("Autocompleteが機能するか", async () => {
    const handleGetParkSearchResults = jest.fn();
    render(
      <RecoilRoot>
        <MemoryRouter>
          <SearchParkContext.Provider value={{ handleGetParkSearchResults }}>
            <Top />
          </SearchParkContext.Provider>
        </MemoryRouter>
      </RecoilRoot>
    );
    const autocomplete = screen.getByTestId("autocomplete");
    const input = screen.getByPlaceholderText("昆虫名を入力して下さい");
    autocomplete.focus();

    await userEvent.type(input, "カブトムシ");
    await userEvent.type(autocomplete, "{arrowdown}{enter}");

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).toBeNull();
    });
  });

  it("検索ワードの変更が正しく行われるか", async () => {
    const handleGetParkSearchResults = jest.fn();
    render(
      <RecoilRoot>
        <MemoryRouter>
          <SearchParkContext.Provider value={{ handleGetParkSearchResults }}>
            <Top />
          </SearchParkContext.Provider>
        </MemoryRouter>
      </RecoilRoot>
    );
    const searchInput = screen.getByPlaceholderText("昆虫名を入力して下さい");
    userEvent.type(searchInput, "カブトムシ");
    expect(searchInput.value).toBe("カブトムシ");
  });
