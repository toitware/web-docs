import { createMuiTheme, PaletteType, responsiveFontSizes, Theme } from "@material-ui/core";
import Color from "color";

const defaultSpacing = 8;

export const passion = Color("#FF8484");
export const golden = Color("#FAC864");
export const dart = Color("#5E6FDB");
export const python = Color("#53978E");
export const tiger = Color("#53978E");

export const passionSecondary = Color("#FFB5B5");
export const goldenSecondary = Color("#FFE598");
export const dartSecondary = Color("#C1C9FF");
export const pythonSecondary = Color("#BDDCD8");
export const tigerSecondary = Color("#FFDBC0");

// The color definitions provided by our corporate identity.
export const primaryRed = Color.hsl(0, 100, 76);
export const primaryBlue = Color.hsl(213, 60, 30);
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
  text: Color("black"),
});
export const blueWhiteTheme = createTheme({
  type: "dark",
  background: Color("black"),
  text: Color("white"),
  primary: golden,
  primaryContrast: Color("black"),
});

export const primaryTheme = whiteBlueTheme;

export const lightTheme = primaryTheme;
export const darkTheme = blueWhiteTheme;

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
  primary = dart,
  primaryContrast = Color("white"),
  secondary = passion,
  secondaryContrast = Color("white"),
  spacing = defaultSpacing,
}: CreateThemeParameters): Theme {
  const textColor = text.string();
  const bodyFontFamily = "Roboto, Helvetica, Arial, sans-serif";
  const titleFontFamily = "ClashDisplay, Helvetica, Arial, sans-serif";

  // Small helper function that blends the color with the background if we're in
  // a "light" theme (since then the background is light), and simply lightens
  // it otherwise (= makes it more white).
  //
  // This is preferable to simply using lighten/darken because it preserves
  // color information: if you have white text and darken it, it will become
  // grey, which doesn't look too great on a colored background. But if you
  // blend it with the background, it will simply get closer to that color which
  // normally is what you want.
  function lighten(color: Color, ratio = 0.2): Color {
    if (type == "dark") {
      return color.lighten(ratio);
    } else {
      return color.mix(background, ratio);
    }
  }
  // The exact opposite of lighten().
  function darken(color: Color, ratio = 0.2) {
    if (type == "light") {
      return color.darken(ratio);
    } else {
      return color.mix(background, ratio);
    }
  }

  function increaseContrast(color: Color) {
    return type == "light" ? darken(color, 0.6) : lighten(color, 0.6);
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
        fontSize: 14,
        body1: {},
        body2: {
          fontSize: 13,
        },
        h1: {
          fontSize: 40,
          fontFamily: titleFontFamily,
          fontWeight: "normal",
          color: increaseContrast(text).string(),
        },
        h2: {
          fontSize: 30,
          fontFamily: titleFontFamily,
          fontWeight: "normal",
          color: increaseContrast(text).string(),
        },
        h3: {
          fontSize: 20,
          fontFamily: titleFontFamily,
          fontWeight: "normal",
          color: increaseContrast(text).string(),
        },
        h4: {
          fontSize: 17,
          fontFamily: titleFontFamily,
          fontWeight: "bold",
          color: increaseContrast(text).string(),
        },
        h5: {
          fontSize: 16,
          fontFamily: titleFontFamily,
          fontWeight: "bold",
          color: increaseContrast(text).string(),
        },
      },
    })
  );
}
