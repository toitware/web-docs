import Color from "color";
import { createTheme, primaryBlue } from "../theme";

describe("createTheme", () => {
  it("returns a Theme object with correct colors", () => {
    const theme = createTheme({ background: Color("black"), text: Color("white") });
    expect(theme.palette.background.default).toBe("rgb(0, 0, 0)");

    expect(theme.palette.text.primary).toBe("rgb(255, 255, 255)");
    expect(theme.palette.text.secondary).toBe("rgba(255, 255, 255, 0.7)");
    expect(theme.palette.text.disabled).toBe("rgba(255, 255, 255, 0.5)");

    expect(theme.palette.primary.main).toBe(primaryBlue.string());
    expect(theme.palette.primary.dark).toBe("hsl(213, 29%, 24%)");
  });
});
