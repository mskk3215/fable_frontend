import { RecoilRoot } from "recoil";
import { Router } from "./router/Router";
import { MessageToast } from "./app/_components/MessageToast";

export const App = () => {
  return (
    <RecoilRoot>
      <Router />
      <MessageToast />
    </RecoilRoot>
  );
};
