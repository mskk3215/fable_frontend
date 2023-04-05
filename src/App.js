import { UserProvider } from "./providers/UserProvider";
import { SearchParkProvider } from "./providers/SearchParkProvider";
import { Router } from "./router/Router";

export const App = () => {
  return (
    <UserProvider>
      <SearchParkProvider>
        <Router />
      </SearchParkProvider>
    </UserProvider>
  );
};
