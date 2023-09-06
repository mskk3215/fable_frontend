import { RecoilRoot } from "recoil";
import { Router } from "./router/Router";
import { ErrorMessageToast } from "./components/atoms/toast/ErrorMessageToast";

export const App = () => {
  return (
    <RecoilRoot>
      <Router />
      <ErrorMessageToast />
    </RecoilRoot>
  );
};
