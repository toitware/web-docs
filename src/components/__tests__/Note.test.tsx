import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import Note from "../Note";

// The existing tests are not wrapped in a describe block, so we follow
// the same pattern.
// eslint-disable-next-line no-restricted-syntax
describe("Note", () => {
  it("renders title and content", () => {
    render(<Note title="Test title">Test content</Note>);

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders info icon", () => {
    render(
      <Note title="Test title" type="info">
        Test content
      </Note>
    );

    expect(screen.getByTestId("info-icon")).toBeInTheDocument();
  });

  it("renders warning icon", () => {
    render(
      <Note title="Test title" type="warning">
        Test content
      </Note>
    );

    expect(screen.getByTestId("warning-icon")).toBeInTheDocument();
  });
});
