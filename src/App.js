import { UserProvider } from "./providers/UserProvider";
import { SearchParkProvider } from "./providers/SearchParkProvider";
import { Router } from "./router/Router";
import { RecoilRoot } from "recoil";

export const App = () => {
  return (
    <UserProvider>
      <RecoilRoot>
        <SearchParkProvider>
          <Router />
        </SearchParkProvider>
      </RecoilRoot>
    </UserProvider>
  );
};
