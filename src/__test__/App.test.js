import { render } from "@testing-library/react";
import { App } from "../App";

describe("App component", () => {
  test("renders without error", () => {
    render(<App />);
  });
});
