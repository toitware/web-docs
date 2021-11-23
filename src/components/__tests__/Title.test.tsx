/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom"; // Provides jest dom matchers
import { render, screen } from "@testing-library/react";
import { StableClassNames } from "@toitware/testing-utils";
import React from "react";
import Title from "../Title";

describe("Title", () => {
  // This is an exaggerated test and not a recommendation of how tests should
  // be written. It serves as an example you can use to write more valuable
  // tests.
  // Checkout this example for a more interesting example:
  // https://testing-library.com/docs/react-testing-library/example-intro
  it("renders correctly", () => {
    const result = render(
      <StableClassNames>
        <Title>title content</Title>
      </StableClassNames>
    );

    expect(result.container.firstChild).toMatchSnapshot();

    expect(screen.getByText("title content")).toBeInstanceOf(HTMLHeadingElement);
  });
});
