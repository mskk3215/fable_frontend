import { RecoilRoot } from "recoil";
import { SearchParkProvider } from "./providers/SearchParkProvider";
import { Router } from "./router/Router";

export const App = () => {
  return (
    <RecoilRoot>
      <SearchParkProvider>
        <Router />
      </SearchParkProvider>
    </RecoilRoot>
  );
};
