import { renderHook, act, waitFor } from "@testing-library/react";
import { useAllInsects } from "./useAllInsects";
import * as urls from "../urls";
import { RecoilRoot } from "recoil";

// getInsects関数のモック化
jest.mock("../urls", () => ({
  getInsects: jest.fn(),
}));

describe("useAllInsects custom hook", () => {
  it("queryWordに基づいて昆虫のデータを取得する", async () => {
    const mockInsectsData = [
      { insectName: "カブトムシ" },
      { insectName: "クワガタ" },
    ];

    // getInsectsのモック実装
    (urls.getInsects as jest.Mock).mockResolvedValue({
      data: mockInsectsData,
    });

    const { result } = renderHook(() => useAllInsects(), {
      wrapper: RecoilRoot,
    });

    // 初期状態の確認
    expect(result.current.insects).toEqual([]);
    expect(result.current.insectOptions).toEqual([]);

    // queryWordをセットしてデータフェッチをトリガー
    act(() => {
      result.current.setQueryWord("カブト");
    });

    // 更新が完了するまで待機
    await act(async () => {
      await waitFor(() => {});
    });

    // データが正しくフェッチされ、状態が更新されたことを確認
    expect(result.current.insects).toEqual(mockInsectsData);
    expect(result.current.insectOptions).toEqual(["カブトムシ", "クワガタ"]);
  });
});
