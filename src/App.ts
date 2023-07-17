// @ts-expect-error TS(6142): Module './providers/UserProvider' was resolved to ... Remove this comment to see the full error message
import { UserProvider } from "./providers/UserProvider";
// @ts-expect-error TS(6142): Module './providers/SearchParkProvider' was resolv... Remove this comment to see the full error message
import { SearchParkProvider } from "./providers/SearchParkProvider";
// @ts-expect-error TS(6142): Module './router/Router' was resolved to '/Users/u... Remove this comment to see the full error message
import { Router } from "./router/Router";
import { RecoilRoot } from "recoil";

export const App = () => {
  return (
    // @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
    <UserProvider>
      // @ts-expect-error TS(2749): 'RecoilRoot' refers to a value, but is being used ... Remove this comment to see the full error message
      <RecoilRoot>
        // @ts-expect-error TS(2749): 'SearchParkProvider' refers to a value, but is bei... Remove this comment to see the full error message
        <SearchParkProvider>
          // @ts-expect-error TS(2749): 'Router' refers to a value, but is being used as a... Remove this comment to see the full error message
          <Router />
        </SearchParkProvider>
      </RecoilRoot>
    </UserProvider>
  );
};
