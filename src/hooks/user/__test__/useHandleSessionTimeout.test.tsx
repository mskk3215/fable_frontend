import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  MutableSnapshot,
  RecoilRoot,
  useRecoilValue,
} from "recoil";
import { getUserLogin } from "../../../urls";
import { messageState } from "../../../store/atoms/errorAtom";
import { loginUserState } from "../../../store/atoms/userAtom";
import { User } from "../../../types/user";
import { useSessionTimeout } from "../useHandleSessionTimeout";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("../../../urls", () => ({
  getUserLogin: jest.fn(),
}));

const mockedGetUserLogin = getUserLogin as jest.MockedFunction<
  typeof getUserLogin
>;

const loginUser: User = {
  id: 1,
  nickname: "テストユーザー",
  following: [],
};

const SessionTimeoutTestComponent = () => {
  useSessionTimeout();
  const currentUser = useRecoilValue(loginUserState);
  const message = useRecoilValue(messageState);

  return (
    <>
      <div data-testid="login-user">
        {currentUser ? currentUser.nickname : "ログアウト済み"}
      </div>
      <div data-testid="message">{message.message}</div>
    </>
  );
};

const initializeState = ({ set }: MutableSnapshot) => {
  set(loginUserState, loginUser);
};

describe("useSessionTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("セッション確認が401の場合、ログアウトしてトップページへ戻る", async () => {
    mockedGetUserLogin.mockRejectedValue({
      response: { status: 401 },
      errorMessage: [
        "操作がない状態が続いた為、自動ログアウトさせていただきました。",
      ],
    });

    render(
      <RecoilRoot initializeState={initializeState}>
        <SessionTimeoutTestComponent />
      </RecoilRoot>
    );

    await act(async () => {
      jest.advanceTimersByTime(1800000);
    });

    expect(mockedGetUserLogin).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("login-user")).toHaveTextContent(
      "ログアウト済み"
    );
    expect(screen.getByTestId("message")).toHaveTextContent(
      "操作がない状態が続いた為、自動ログアウトさせていただきました。"
    );
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("セッション確認がloggedIn falseの場合、ログアウトしてトップページへ戻る", async () => {
    mockedGetUserLogin.mockResolvedValue({
      status: 200,
      data: {
        loggedIn: false,
        message: "ユーザーが存在しません",
      },
    } as Awaited<ReturnType<typeof getUserLogin>>);

    render(
      <RecoilRoot initializeState={initializeState}>
        <SessionTimeoutTestComponent />
      </RecoilRoot>
    );

    await act(async () => {
      jest.advanceTimersByTime(1800000);
    });

    expect(mockedGetUserLogin).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("login-user")).toHaveTextContent(
      "ログアウト済み"
    );
    expect(screen.getByTestId("message")).toHaveTextContent(
      "ユーザーが存在しません"
    );
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("セッション確認が401以外のエラーの場合、ログアウトしない", async () => {
    mockedGetUserLogin.mockRejectedValue({
      response: { status: 500 },
      errorMessage: "サーバーエラーが発生しました。",
    });

    render(
      <RecoilRoot initializeState={initializeState}>
        <SessionTimeoutTestComponent />
      </RecoilRoot>
    );

    await act(async () => {
      jest.advanceTimersByTime(1800000);
    });

    expect(mockedGetUserLogin).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("login-user")).toHaveTextContent(
      "テストユーザー"
    );
    expect(screen.getByTestId("message")).toBeEmptyDOMElement();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
