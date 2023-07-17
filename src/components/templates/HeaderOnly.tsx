// @ts-expect-error TS(6142): Module '../atoms/layout/Header' was resolved to '/... Remove this comment to see the full error message
import { Header } from "../atoms/layout/Header";

export const HeaderOnly = (props: any) => {
  const { children } = props;
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Header />
      {children}
    </>
  );
};
