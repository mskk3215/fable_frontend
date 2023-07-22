import { RecoilRoot } from "recoil";
import { UserProvider } from "./providers/UserProvider";
import { SearchParkProvider } from "./providers/SearchParkProvider";
import { Router } from "./router/Router";

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
