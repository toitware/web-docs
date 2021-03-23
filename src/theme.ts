import { createMuiTheme, PaletteType, responsiveFontSizes, Theme } from "@material-ui/core";
import Color from "color";

const defaultSpacing = 8;

// The color definitions provided by our corporate identity.
export const primaryRed = Color.hsl(0, 100, 76);
export const primaryBlue = Color.hsl(213, 29, 30);
export const secondaryGold = Color.hsl(40, 94, 69);
export const secondaryBlack = Color.hsl(0, 0, 16);
export const secondaryRed = Color.hsl(0, 100, 70);

// The different themes used throughout the website.
export const pinkWhiteTheme = createTheme({
  type: "dark",
  background: primaryRed,
  text: Color("white"),
  errorColor: primaryBlue,
  primary: Color("white"),
  primaryContrast: primaryRed,
});
export const whiteBlueTheme = createTheme({
  background: Color("white"),
  text: primaryBlue,
});

export const primaryTheme = pinkWhiteTheme;

type CreateThemeParameters = {
  type?: PaletteType;
  background: Color;
  text: Color;
  primary?: Color;
  primaryContrast?: Color;
  secondary?: Color;
  secondaryContrast?: Color;
  errorColor?: Color;
  spacing?: number;
};

export function createTheme({
  type = "light",
  background,
  text,
  errorColor = primaryRed,
  primary = primaryBlue,
  primaryContrast = Color("white"),
  secondary = secondaryRed,
  secondaryContrast = Color("white"),
  spacing = defaultSpacing,
}: CreateThemeParameters): Theme {
  const textColor = text.string();
  const bodyFontFamily = "Roboto, Helvetica, Arial, sans-serif";
  const titleFontFamily = "Canano Light, Helvetica, Arial, sans-serif";

  // Small helper function that blends the color with the background if we're in
  // a "light" theme (since then the background is light), and simply lightens
  // it otherwise (= makes it more white).
  //
  // This is preferable to simply using lighten/darken because it preserves
  // color information: if you have white text and darken it, it will become
  // grey, which doesn't look too great on a colored background. But if you
  // blend it with the background, it will simply get closer to that color which
  // normally is what you want.
  function lighten(color: Color): Color {
    if (type == "dark") {
      return color.lighten(0.2);
    } else {
      return color.mix(background, 0.2);
    }
  }
  // The exact opposite of lighten().
  function darken(color: Color) {
    if (type == "light") {
      return color.darken(0.2);
    } else {
      return color.mix(background, 0.2);
    }
  }

  return responsiveFontSizes(
    createMuiTheme({
      spacing: spacing,
      palette: {
        type: type,
        primary: {
          main: primary.string(),
          light: lighten(primary).string(),
          dark: darken(primary).string(),
          contrastText: primaryContrast.string(),
        },
        secondary: {
          main: secondary.string(),
          light: lighten(secondary).string(),
          dark: darken(secondary).string(),
          contrastText: secondaryContrast.string(),
        },
        error: {
          main: errorColor.string(),
        },
        background: {
          default: background.string(),
        },
        text: {
          primary: text.string(),
          secondary: text.alpha(0.7).string(),
          disabled: text.alpha(0.5).string(),
          hint: text.alpha(0.5).string(),
        },
      },
      typography: {
        allVariants: {
          color: textColor,
        },
        fontFamily: bodyFontFamily,
        fontSize: 16,
        body1: {},
        body2: {
          fontSize: "0.80rem",
        },
        h1: {
          fontSize: "3.5rem",
          fontFamily: titleFontFamily,
        },
        h2: {
          fontSize: "3.0rem",
          fontFamily: titleFontFamily,
        },
        h3: {
          fontSize: "2.0rem",
          fontFamily: titleFontFamily,
        },
      },
    })
  );
}
