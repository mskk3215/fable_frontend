import { RecoilRoot } from "recoil";
import { Router } from "./router/Router";

export const App = () => {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
};
