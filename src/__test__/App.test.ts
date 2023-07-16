import { render } from "@testing-library/react";
import { App } from "../App";

describe("App component", () => {
  it("renders without error", () => {
    render(<App />);
  });
});
