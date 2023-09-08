import { RecoilRoot } from "recoil";
import { Router } from "./router/Router";
import { MessageToast } from "./components/atoms/toast/MessageToast";

export const App = () => {
  return (
    <RecoilRoot>
      <Router />
      <MessageToast />
    </RecoilRoot>
  );
};
