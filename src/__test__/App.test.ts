import { render } from "@testing-library/react";
import { App } from "../App";

describe("App component", () => {
  it("renders without error", () => {
    // @ts-expect-error TS(2749): 'App' refers to a value, but is being used as a ty... Remove this comment to see the full error message
    render(<App />);
  });
});
